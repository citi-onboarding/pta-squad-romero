import DetailsPage from "@/components/page/detailsPage"

export default function Home({ params }: { params: { id: string } }) {
  return <DetailsPage appointmentId={params.id} />
}