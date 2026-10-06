import { useState } from 'react';

export function CourseReview() {
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          color: '#166534'
        }}
      >
        <h3 style={{ marginTop: 0 }}>Дякуємо за відгук!</h3>
        <p><strong>Ваша оцінка:</strong> {rating} / 5</p>
        <p><strong>Ваш коментар:</strong> {reviewText || 'Без коментаря'}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        maxWidth: '500px'
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Оцініть курс</h3>
      
      <div style={{ marginBottom: '16px' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Оцінка:</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              style={{
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor: rating === star ? '#2563eb' : '#f3f4f6',
                color: rating === star ? '#ffffff' : '#374151',
                transition: 'all 0.2s'
              }}
            >
              {star} ★
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="review"
          style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
        >
          Текст відгуку:
        </label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="Напишіть свої враження про курс..."
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#16a34a',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Відправити відгук
      </button>
    </form>
  );
}
