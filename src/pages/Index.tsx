
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona automaticamente para a página do mapa
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
