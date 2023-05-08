import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user =  localStorage.getItem('user');

    if (user) {
      router.push('/Chat');
    } else {
      router.push('/Signup');
    }
  }, []);

  return (
    <>
      <Link href="/Signup">Sign up</Link>
    </>
  )
}
