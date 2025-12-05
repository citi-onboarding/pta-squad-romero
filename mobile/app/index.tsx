import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl, // Refresh screen
  ActivityIndicator // Show loading icon
} from "react-native";
import { PetCard } from "../src/components/petCard/petCard";
import { logoCiti } from "@assets";
import { getAppointments } from "../src/services/appointment";

interface AppointmentDB { // interface of data base
  id: number;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  appointmentType: string;
  pet: {
    petName: string;
    ownerName: string;
    petSpecies: string;}
}

// Translating images 
const speciesMap: Record<string, string> = {
  "Ovelha": "sheep",
  "Gato": "cat",
  "Porco": "pig",
  "Vaca": "cow",
  "Cavalo": "horse",
  "Cachorro": "dog"
};

type FilterType = "all" | "morning" | "afternoon" | "night";

export default function App() {
  const [appointments, setAppointments] = useState<AppointmentDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Seach for data in backend
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments(); // Call API
      setAppointments(data);
    } catch (error) {
      console.log("Erro ao buscar:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Load when open app
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
  }, []);

  // Function to get Time on HH:MM Format
  const getHour = (time: string): number => {
    try {
      return parseInt(time.split(":")[0], 10);
    } catch (e) {
      return 0; // Return 0 if error
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    // Transforms "2024-10-10..." to "10/10"
    try {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    } catch (e) { return dateString }
  };

  // Filter
  const filteredAppointments = useMemo(() => {
    // if no data, return nothing
    if (!appointments) return [];

    let list = appointments;
    if (activeFilter !== "all") {
      list = appointments.filter((app) => {
        const hour = getHour(app.appointmentTime);
        switch (activeFilter) {
          case "morning": return hour >= 0 && hour <= 12;
          case "afternoon": return hour > 12 && hour <= 18;
          case "night": return hour > 18 && hour < 24;
          default: return true;
        }
      });
    }
    return list;
  }, [activeFilter, appointments]);

  // Filter Button
  const FilterButton: React.FC<{
    type: FilterType;
    label: string;
    icon: string;
  }> = ({ type, label, icon }) => {
    const isActive = activeFilter === type;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isActive && styles.filterButtonActive]}
        onPress={() => setActiveFilter(type)}
        activeOpacity={0.7}
      >
        <Text style={styles.filterIcon}>{icon}</Text>
        <Text
          style={[styles.filterLabel, isActive && styles.filterLabelActive]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacing} />
      <View style={styles.header}>
        <Image source={logoCiti} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Sua agenda</Text>
        <Text style={styles.subtitle}>
          Veja aqui todos os seus pacientes agendados para hoje.
        </Text>
      </View>

      <View style={styles.filteredBar}>
        <View style={styles.filterBar}>
          <FilterButton type="morning" label="" icon="☀️" />
          <FilterButton type="afternoon" label="" icon="🌥️" />
          <FilterButton type="night" label="" icon="🌙" />
        </View>
      </View>

      {/* Loading logic */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <ActivityIndicator size="large" color="#50E678" />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.cardListContainer}
          showsVerticalScrollIndicator={false}
          // Refresh
          refreshControl={
             <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
                tintColor="#50E678"
             />
          }
        >
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app) => (
              <View key={app.id} style={styles.cardSpacing}>
                <PetCard
                  appointmentDate={formatDate(app.appointmentDate)}
                  appointmentTime={app.appointmentTime}
                  doctorName={app.doctorName}
                  appointmentType={app.appointmentType}
                  petSpecies={speciesMap[app.pet?.petSpecies] || "cat"} // Security image
                  petName={app.pet?.petName || "Desconhecido"}
                  ownerName={app.pet?.ownerName || "Desconhecido"}
                />
              </View>
            ))
          ) : (
            <Text style={styles.emptyListText}>
              Nenhum agendamento encontrado para este período.
            </Text>
          )}
        </ScrollView>
      )}
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  spacing: {
    height: 30,
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },

  titleContainer: {
    paddingHorizontal: 55,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
    fontWeight: 400,
  },
  filteredBar: {
    paddingHorizontal: 79,
    marginBottom: 20,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 50,
    padding: 6,
    gap: 8,
    width: 252,
    height: 70,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  filterButtonActive: {
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  filterIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  filterLabelActive: {
    color: "#1a1a1a",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 19,
  },
  cardListContainer: {
    paddingBottom: 75,
    alignItems: "center",
  },
  cardSpacing: {
    width: "100%",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75, 
    backgroundColor: "#50E678", 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
  },
});

