import { FieldsTable } from "./components/fields/fields-table";
import { FillTable } from "./components/fillers/fills-table";
import { Header } from "./components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <div>
      <div className="container m-auto">
        <Header />
        <Tabs defaultValue="campos" className="">
          <TabsList className=" w-full">
            <TabsTrigger value="campos">Campos</TabsTrigger>
            <TabsTrigger value="preenchimentos">Preenchimentos</TabsTrigger>
          </TabsList>
          <TabsContent value="campos">
            <FieldsTable />
          </TabsContent>
          <TabsContent value="preenchimentos">
            <FillTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
