import React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

function SelectedChips({ selectCategoryTitle, handleCategories, categoryId, categoryData }) {
  return (
    <Chip
      variant="soft"
      color="danger"
      endDecorator={<ChipDelete onDelete={(e) => handleCategories(e, categoryId, categoryData)} />}
      style={{ position: 'relative', zIndex: 0 }}
    >
      {selectCategoryTitle}
    </Chip>
  );
}

export default SelectedChips;
