import { Badge } from 'react-bootstrap';
import Image from 'next/image';

const Tag = (props) => {
  return (
    <span className="m-2 img-container">
      <div className="rounded-pill py-1 mb-3 text-secondary medium-small bg-light d-inline-block px-3">{props.tag}</div>
      <Badge
        bg="white"
        className="rounded-circle text-dark tag-cancel me-2 bg-white px-2 py-1 shadow-sm"
        onClick={() => props.deleteTag(props.index)}
        style={{ cursor: 'pointer' }}
      >
        <Image src="/assets/icons/creationicons/cross.svg" width="8px" alt="cross" height="8px" />
      </Badge>
    </span>
  );
};

export default Tag;
