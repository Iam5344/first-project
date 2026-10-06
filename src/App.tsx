import { CourseReview } from './components/CourseReview';

export default function App() {
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Відгуки про навчання</h1>
      <section style={{ marginTop: '20px' }}>
        <CourseReview />
      </section>
    </main>
  );
}
