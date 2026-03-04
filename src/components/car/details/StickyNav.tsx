'use client';

export default function StickyNav({ activeSection, onNavigate }: any) {
  const tabs = ['Details', 'Features', 'Design', 'Sales'];

  return (
    <div className="sticky top-0 bg-card border-b">
      <div className="flex justify-center gap-8">
        {tabs.map((tab) => {
          const id = tab.toLowerCase();
          return (
            <button
              key={tab}
              onClick={() => onNavigate(id)}
              className={`py-4 ${
                activeSection === id ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}