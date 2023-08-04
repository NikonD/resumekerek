"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import Resume from "components/Resume";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'resume' | 'responses'>('resume');

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 md:grid-cols-6">

          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://placekitten.com/200/200"
                alt="User Avatar"
              />
              <h2 className="ml-4 text-xl font-bold">John Doe</h2>
            </div>

            <div className="mb-4">
              <button
                onClick={() => setActiveTab('resume')}
                className={`mr-2 p-2 rounded-lg ${activeTab === 'resume' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
              >
                Резюме
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`p-2 rounded-lg ${activeTab === 'responses' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
              >
                Отлики
              </button>
            </div>

            {activeTab === 'resume' && (
              <div>
                {/* Форма заполнения резюме */}
              </div>
            )}

            {activeTab === 'responses' && (
              <div>
                {/* Отображение отликов */}
              </div>
            )}
          </div>

        </div>
      </main>
    </Provider>
  );
}