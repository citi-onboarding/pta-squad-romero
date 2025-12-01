import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { dog, sheep, horse, cow, cat, pig, alarm } from "../../assets";

type Props = {
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  appointmentType: string;
  petSpecies: string;
  petName: string;
  ownerName: string;
};

export function PetCard({
  appointmentDate,
  appointmentTime,
  doctorName,
  appointmentType,
  petSpecies,
  petName,
  ownerName,
}: Props) {
  function species(petSpecies: string) {
    switch (petSpecies) {
      case "cat":
        return cat;
      case "sheep":
        return sheep;
      case "horse":
        return horse;
      case "cow":
        return cow;
      case "dog":
        return dog;
      case "pig":
        return pig;
      default:
        return cat;
    }
  }

  function background(appointmentType: string): string {
    switch (appointmentType) {
      case "Primeira Consulta":
        return "#BFB5FF";
      case "Vacinacao":
        return "#AAE1FF";
      case "Retorno":
        return "#FF6419";
      case "Checkup":
        return "#9CFF95";
      default:
        return "#BFB5FF";
    }
  }

  const backgroundColor = background(appointmentType);
  return (
    <View
      style={[styles.cardContainerMobile, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.dateTimeContainer}>
        <Image source={alarm} style={styles.iconAlarm} />
        <Text style={styles.dateText}>{appointmentDate}</Text>
        <Text style={styles.dateText}>{appointmentTime}</Text>
      </View>
      <View style={styles.petOwnDoc}>
        <Text style={styles.petOwnerText}>
          <Text style={styles.petNameText}>{petName}</Text> / {ownerName}
        </Text>
        <Text style={styles.doctorNameText}>{doctorName}</Text>
      </View>
      <View style={styles.petInfoContainer}>
        <Image source={species(petSpecies)} style={styles.petImage} />
        <View style={styles.appointmentTypeWrapper}>
          <Text style={styles.appointmentTypeText}>{appointmentType}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainerMobile: {
    width: 358,
    height: 122,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    margin: 10,
  },

  dateTimeContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  iconAlarm: {
    width: 20,
    height: 20,
  },

  dateText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  petOwnDoc:{
    gap: 6,
  },

  petOwnerText: {
    fontSize: 14,
    textAlign: "center",
  },

  petNameText: {
    fontWeight: "bold",
  },

  doctorNameText: {
    fontSize: 14,
    textAlign: "center",
  },

  petInfoContainer: {
    gap: 8,
    flexDirection: "column",
    alignItems: "center",
  },

  petImage: {
    width: 57,
    height: 57,
  },

  appointmentTypeWrapper: {
    width: 100,
    height: 25,
    borderRadius: 4,
    padding: 6,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },

  appointmentTypeText: {
    fontSize: 10,
    textAlign: "center",
  },
});
