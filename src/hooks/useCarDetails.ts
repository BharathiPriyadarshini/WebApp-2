'use client';

import { useEffect, useState } from 'react';
import carsData from '@/data/cars.json';
import { EXTERIOR_IMAGES, INTERIOR_IMAGES } from '@/constants/mockData';

export function useCarDetails(id: number) {
  const [car, setCar] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [activeSection, setActiveSection] = useState('details');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const offset = el.getBoundingClientRect().top + window.scrollY - 85;
    window.scrollTo({ top: offset, behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const foundCar = carsData.find((c) => c.id === id);
    if (!foundCar) return;

    setCar({
      ...foundCar,
      horsepower: 180,
      torque: '320 Nm',
      acceleration: '6.8s',
      colors: ['#FFFFFF', '#1F2937', '#DC2626', '#2563EB'],
      description:
        'Premium automatic variant with refined performance and cutting-edge technology.',
      gallery: {
        exterior: EXTERIOR_IMAGES,
        interior: INTERIOR_IMAGES,
      },
    });
  }, [id]);

  useEffect(() => {
    if (!car) return;

    const handleScroll = () => {
      const sections = ['details', 'features', 'design', 'sales'];
      let current = sections[0];

      for (const sid of sections) {
        const el = document.getElementById(sid);
        if (el && el.getBoundingClientRect().top <= 100) {
          current = sid;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [car]);

  return {
    car,
    selectedColor,
    setSelectedColor,
    activeSection,
    setActiveSection,
    scrollToSection,
  };
}