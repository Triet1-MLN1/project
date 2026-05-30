import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Footer from './Footer';
import ChatBot from './ChatBot';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      {/* <ChatBot /> */}
    </div>
  );
}
