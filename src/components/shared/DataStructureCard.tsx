// src/components/shared/DataStructureCard.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { CardHeader } from '../ui/Card';
import { CardTitle } from '../ui/Card';
import { CardDescription } from '../ui/Card';

interface DataStructureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const DataStructureCard: React.FC<DataStructureCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <Card 
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-shadow"
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};