import React, { useState, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { PetCard } from "../src/components/petCard/petCard";
import { logoCiti } from "@assets";

interface Appointment {
  id: number;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  appointmentType: "Retorno" | "Vacinacao" | "Checkup" | "Primeira Consulta";
  petSpecies: "cat" | "dog" | "horse" | "cow" | "pig" | "sheep";
  petName: string;
  ownerName: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    appointmentDate: "18/02",
    appointmentTime: "10:00",
    doctorName: "Dr. José Carlos",
    appointmentType: "Primeira Consulta",
    petSpecies: "cat",
    petName: "Luna",
    ownerName: "João Alves",
  },
  {
    id: 2,
    appointmentDate: "18/02",
    appointmentTime: "11:30",
    doctorName: "Dr. Ana Paula",
    appointmentType: "Vacinacao",
    petSpecies: "dog",
    petName: "Rex",
    ownerName: "Fernanda Costa",
  },
  {
    id: 3,
    appointmentDate: "18/02",
    appointmentTime: "14:00",
    doctorName: "Dr. Bruno Lima",
    appointmentType: "Checkup",
    petSpecies: "horse",
    petName: "Estrela",
    ownerName: "Rafaela Mendes",
  },
  {
    id: 4,
    appointmentDate: "18/02",
    appointmentTime: "17:30",
    doctorName: "Dr. José Carlos",
    appointmentType: "Retorno",
    petSpecies: "pig",
    petName: "Bacon",
    ownerName: "Pedro Souza",
  },
  {
    id: 5,
    appointmentDate: "18/02",
    appointmentTime: "20:00",
    doctorName: "Dr. Ana Paula",
    appointmentType: "Primeira Consulta",
    petSpecies: "cow",
    petName: "Mimosa",
    ownerName: "Mariana Silva",
  },
  {
    id: 6,
    appointmentDate: "18/02",
    appointmentTime: "22:30",
    doctorName: "Dr. Bruno Lima",
    appointmentType: "Vacinacao",
    petSpecies: "sheep",
    petName: "Dolly",
    ownerName: "Lucas Ferreira",
  },
];

type FilterType = "all" | "morning" | "afternoon" | "night";

export const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Function to get Time on HH:MM Format
  const getHour = (time: string): number => {
    try {
      return parseInt(time.split(":")[0], 10);
    } catch (e) {
      return 0; // Return 0 if error
    }
  };

  // Filter
  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") {
      return mockAppointments;
    }

    return mockAppointments.filter((appointment) => {
      const hour = getHour(appointment.appointmentTime);

      switch (activeFilter) {
        case "morning":
          return hour >= 0 && hour <= 12;
        case "afternoon":
          return hour > 12 && hour <= 18;
        case "night":
          return hour > 18 && hour < 24;
        default:
          return true;
      }
    });
  }, [activeFilter]);

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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.cardListContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((app) => (
            <View key={app.id} style={styles.cardSpacing}>
              <PetCard
                appointmentDate={app.appointmentDate}
                appointmentTime={app.appointmentTime}
                doctorName={app.doctorName}
                appointmentType={app.appointmentType}
                petSpecies={app.petSpecies}
                petName={app.petName}
                ownerName={app.ownerName}
              />
            </View>
          ))
        ) : (
          <Text style={styles.emptyListText}>
            Nenhum agendamento encontrado para este período.
          </Text>
        )}
      </ScrollView>
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
    paddingBottom: 40,
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
    backgroundColor: "#50E678", // Cor verde clara da logo/footer
    borderTopLeftRadius: 24, // Borda arredondada superior esquerda
    borderTopRightRadius: 24, // Borda arredondada superior direita
  },
});

export default App;
