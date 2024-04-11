import React from 'react';

export const TimeAgo = (updatedDate: string) => {
    const timeDiff = Date.now() - new Date(updatedDate).getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffDays < 1) {
        const diffHours = Math.floor(timeDiff / (1000 * 3600));
        return <span>{diffHours} hours ago</span>
      } else if (diffDays < 7) {
        return <span>{diffDays} days ago</span>
      } else if (diffDays < 30) {
        return <span>{diffWeeks} weeks ago</span>
      } else if (diffDays < 365) {
        return <span>{diffMonths} months ago</span>
      } else {
        return <span>{diffYears} years ago</span>
      }
};
