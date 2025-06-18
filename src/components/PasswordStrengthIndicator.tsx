import React from 'react';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log("Rendering PasswordStrengthIndicator with password:", password);

  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200', segments: 0 };

    // Award points for length
    if (pass.length >= 8) score += 1;
    if (pass.length >= 10) score += 1;
    if (pass.length >= 12) score += 1;

    // Award points for character variety
    if (/\d/.test(pass)) score += 1; // Numbers
    if (/[a-z]/.test(pass)) score += 1; // Lowercase
    if (/[A-Z]/.test(pass)) score += 1; // Uppercase
    if (/[^A-Za-z0-9]/.test(pass)) score += 1; // Special characters

    // Determine label, color, and number of filled segments based on score
    if (score < 2) return { score, label: 'Too weak', color: 'bg-red-500', segments: 1 };
    if (score < 4) return { score, label: 'Weak', color: 'bg-orange-500', segments: 2 };
    if (score < 6) return { score, label: 'Medium', color: 'bg-yellow-500', segments: 3 };
    return { score, label: 'Strong', color: 'bg-green-500', segments: 4 };
  };

  const { label, color, segments } = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex space-x-1 h-2 rounded-full overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 transition-colors duration-300 ease-in-out ${
              password && i <= segments ? color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      {password && label && (
        <p className={`text-xs mt-1 ${
            segments === 1 ? 'text-red-500' :
            segments === 2 ? 'text-orange-500' :
            segments === 3 ? 'text-yellow-600' : // Darker yellow for better readability on light bg
            segments === 4 ? 'text-green-500' : 'text-gray-500'
        }`}>
          Strength: {label}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;