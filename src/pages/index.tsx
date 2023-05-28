
import { redirect } from "@/services";

export default function Home() {

  return (
    <>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return redirect('/login');
  } else { 
    return redirect('/profile');
  }

};