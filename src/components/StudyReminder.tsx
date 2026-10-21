import { useState, useRef, useEffect, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function StudyReminder() {
  const [text, setText] = useState<string>('Час повторити хуки!');
  const [seconds, setSeconds] = useState<number>(5);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  const handleStartTimer = (e: FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error('Будь ласка, введіть текст нагадування!');
      return;
    }

    if (seconds <= 0) {
      toast.error('Вкажіть час більше 0 секунд!');
      return;
    }

    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    setIsTimerRunning(true);
    toast.success(`Таймер встановлено на ${seconds} сек.`);


    timerIdRef.current = setTimeout(() => {
      toast(text, {
        duration: 6000,
        icon: '🔔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setIsTimerRunning(false);
      timerIdRef.current = null;
    }, seconds * 1000);
  };

  const handleCancelTimer = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
      setIsTimerRunning(false);
      toast.error('Таймер скасовано');
    }
  };

  return (
    <div
      style={{
        maxWidth: '450px',
        margin: '0 auto',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        fontFamily: 'sans-serif'
      }}
    >      <Toaster position="top-right" reverseOrder={false} />

      <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
        ⏰ Нагадування про навчання
      </h3>

      <form onSubmit={handleStartTimer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Текст нагадування:
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Наприклад: Час зробити перерву"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
            Затримка (у секундах):
          </label>
          <input
            type="number"
            min="1"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {isTimerRunning ? 'Перезапустити таймер' : 'Встановити таймер'}
          </button>

          {isTimerRunning && (
            <button
              type="button"
              onClick={handleCancelTimer}
              style={{
                padding: '10px 16px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Скасувати
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
