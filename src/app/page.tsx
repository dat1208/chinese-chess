import Head from 'next/head';
import JoinRoomForm from './components/JoinRoomForm';
import CreateRoomForm from './components/CreateRoomForm';
const Home: React.FC = () => {
  return (
    <div>
      
      <Head>
        <title>Join Room</title>
      </Head>
      <main>
        <div style={{maxWidth:'50%'}} className="grid grid-cols-1">
          <div >
          <JoinRoomForm />
          </div>
          <div >
          <CreateRoomForm />
          </div>
        </div>
       
        
      </main>
    </div>
  );
};

export default Home;
