import React from 'react';

const TCSMeetingCard = ({ meeting, isAdmin, onEdit, onDelete }) => {
  const formattedDate = meeting.date 
    ? new Date(meeting.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Date TBA';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition hover:shadow-lg p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🏢</span> {meeting.title}
          </h3>
        </div>

        <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <span className="font-medium">📅 Date:</span> {formattedDate}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">👤 Guest:</span> {meeting.guestName}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">📝 Description</h4>
          <p className="mt-1 text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">
            {meeting.description}
          </p>
        </div>

        {meeting.images && meeting.images.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">📸 Photos</h4>
            <div className="grid grid-cols-3 gap-2">
              {meeting.images.map((img, index) => (
                <a key={index} href={img} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-gray-900">
                  <img src={img} alt={`Meeting photo ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                </a>
              ))}
            </div>
          </div>
        )}

        {meeting.notes && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">📋 Notes</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {meeting.notes}
            </p>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(meeting)}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(meeting._id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TCSMeetingCard;
