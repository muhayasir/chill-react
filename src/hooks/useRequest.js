import { useState, useCallback } from 'react';

/**
 * Membungkus sebuah fungsi API supaya state loading dan error
 * diurus otomatis. Dipakai di Login dan Register.
 */
export default function useRequest(apiFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError('');
      try {
        return await apiFunction(...args);
      } catch (err) {
        setError(err.message);
        throw err; // dilempar lagi supaya komponen tahu request gagal
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { run, loading, error, setError };
}