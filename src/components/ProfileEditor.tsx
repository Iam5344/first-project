import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Select from 'react-select';

interface LanguageOption {
  value: string;
  label: string;
}

interface ProfileFormValues {
  fullName: string;
  email: string;
  phones: { number: string }[];
  languages: LanguageOption[];
}

const languageOptions: LanguageOption[] = [
  { value: 'uk', label: 'Українська' },
  { value: 'en', label: 'Англійська' },
  { value: 'de', label: 'Німецька' },
  { value: 'pl', label: 'Польська' },
  { value: 'es', label: 'Іспанська' },
];

export function ProfileEditor() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: 'Глєб',
      email: 'gleb@example.com',
      phones: [{ number: '+380 99 123 45 67' }],
      languages: [{ value: 'uk', label: 'Українська' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  const watchedValues = watch();

  const onSubmit = (data: ProfileFormValues) => {
    console.log('Збережені дані профілю:', data);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        maxWidth: '850px',
        margin: '0 auto',
        padding: '24px',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Ліва колонка: Форма */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <h3 style={{ margin: 0 }}>Редагування профілю</h3>

        {/* 1. ПІБ студента */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            ПІБ студента:
          </label>
          <input
            {...register('fullName', { required: "ПІБ є обов'язковим" })}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
          />
          {errors.fullName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.fullName.message}</span>}
        </div>

        {/* 2. Електронна пошта */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Електронна пошта:
          </label>
          <input
            type="email"
            {...register('email', {
              required: "Email є обов'язковим",
              pattern: { value: /^\S+@\S+$/i, message: 'Некоректний формат пошти' },
            })}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
        </div>

        {/* 3. Динамічні номери телефонів */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Номери телефонів:
          </label>
          {fields.map((field, index) => (
            <div key={field.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                {...register(`phones.${index}.number` as const, { required: 'Введіть номер' })}
                placeholder="+380..."
                style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  style={{
                    padding: '0 12px',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ number: '' })}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            + Додати ще номер
          </button>
        </div>

        {/* 4. Володіння мовами через Controller + react-select */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Володіння мовами:
          </label>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={languageOptions}
                placeholder="Оберіть мови..."
              />
            )}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: '8px',
            padding: '10px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Зберегти
        </button>
      </form>

      {/* Права колонка: Прев'ю профілю */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Картка студента</h3>
        <p><strong>ПІБ:</strong> {watchedValues.fullName || '—'}</p>
        <p><strong>Email:</strong> {watchedValues.email || '—'}</p>

        <div>
          <strong>Телефони:</strong>
          <ul style={{ margin: '4px 0 12px 0', paddingLeft: '20px' }}>
            {watchedValues.phones?.map((p, i) => (
              <li key={i}>{p.number || 'Не вказано'}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Мови:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
            {watchedValues.languages?.length ? (
              watchedValues.languages.map((lang) => (
                <span
                  key={lang.value}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '12px',
                    fontSize: '13px',
                  }}
                >
                  {lang.label}
                </span>
              ))
            ) : (
              <span>Не обрано</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
