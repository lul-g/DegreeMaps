import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  function getRandomInt() {
    return Math.floor(Math.random() * 250);
  }
  const id = getRandomInt();
  return (
    <main className="min-h-screen flex items-center justify-center gap-3 p-5">
      <Link href={`/majors/${id}`}>
        <Button>Public</Button>
      </Link>
      <Link href="/admin/majors">
        <Button>Admin</Button>
      </Link>
    </main>
  );
}
