export interface Person {
    name: string;
    age: number;
    team: string;
  }
  
  export interface Team {
    name: string;
    averageAge: number;
    minAge: number;
    maxAge: number;
  }
  
  export interface ListProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
  }
  
  export interface ValueProps {
    title: string;
    value: number | string;
  }
  
  const ValueDisplay: React.FC<ValueProps> = ({ title, value }) => (
    <div className="mb-6 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>{value}</p>
    </div>
  );
  
  
  const ListDisplay = <T,>({ title, items, renderItem }: ListProps<T>) => (
    <div className="mb-6 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{renderItem(item, index)}</li>
        ))}
      </ul>
    </div>
  );

  

  const data = {
    totalRegistered: 1000,
    averageAgeRacing: 34.5,
    marriedPersons: [
      { name: 'Juan Pérez', age: 25, team: 'Boca' },
      { name: 'María García', age: 30, team: 'River' },
      // Add more persons here
    ] as Person[],
    commonNamesRiver: ['Juan', 'Carlos', 'María', 'Luis', 'Ana'],
    teams: [
      { name: 'River', averageAge: 28.4, minAge: 18, maxAge: 65 },
      { name: 'Boca', averageAge: 30.1, minAge: 19, maxAge: 70 },
      // Add more teams here
    ] as Team[],
  };
  
  const App: React.FC = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <ValueDisplay title="Total Registered People" value={data.totalRegistered} />
      <ValueDisplay title="Average Age of Racing Members" value={data.averageAgeRacing} />
      <ListDisplay
        title="Married Persons with University Degrees"
        items={data.marriedPersons}
        renderItem={(person: Person) => `${person.name}, ${person.age} years, team: ${person.team}`}
      />
      <ListDisplay
        title="Most Common Names among River Fans"
        items={data.commonNamesRiver}
        renderItem={(name: string) => name}
      />
      <ListDisplay
        title="Team Statistics"
        items={data.teams}
        renderItem={(team: Team) => (
          <div className="grid grid-cols-4">
            <span>{team.name}</span>
            <span>{team.averageAge}</span>
            <span>{team.minAge}</span>
            <span>{team.maxAge}</span>
          </div>
        )}
      />
    </div>
  );
  
  export default App;
  