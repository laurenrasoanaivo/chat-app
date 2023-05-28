import NavigationBar from "@/commons/components/NavigationBar";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const onClick = () => toast('Toast is good', { hideProgressBar: true, autoClose: 2000, type: 'default' })

  return (
    <>
      <NavigationBar />
        <div>
          <main>
            <h2>Home Page</h2>
          </main>
        </div>
      <button onClick={onClick}> Click Me</button>
      <ToastContainer />
    </>
  )
}
