import React, { useState } from 'react';

export default function Show({ content, maxLength }) {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <p>
        {content.length >= maxLength && !expand ? `${content.substring(0, maxLength)}...` : content}
        <span onClick={() => setExpand(!expand)}>
          {expand ? '-' : '+'}
        </span>
      </p>
    </div>
  );
}
