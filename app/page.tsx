import Table from './components/Table';


//Contain Game In It's Own Container Component (In case we wanted to put it alongside other content)

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen items-center p-24" style={{backgroundImage: "url('/table.jpg')"}}>
    <Table></Table>
    </main>

  );
}
