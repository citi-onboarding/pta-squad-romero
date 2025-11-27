import ComponentsTest from "@/components/componentsTest/clientSidePage";
import api from "../../api";

async function fetchPetData(){
  try{
    const response = await api.get("/pet");
    console.log(`animalData:`, response.data);
    return response.data;
  }catch(error){
    console.error("Error fetching pet data", error);
    return null;
  }
}

export default async function Home() {
  const petData = await fetchPetData(); // Add 'async' and 'await'
  console.log(`petData in Home page:`, petData);
  return <ComponentsTest />;
}