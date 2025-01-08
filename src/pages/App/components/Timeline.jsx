import PropTypes from 'prop-types';
import TimelineItem from './TimelineItem';

const Timeline = ({ shipment_status }) => {
    const sortedStatus = shipment_status.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return (
        <ol className="relative h-96 border-s border-gray-200 dark:border-gray-400  overflow-y-scroll overflow-x-auto">
        {sortedStatus.map((item, index) => (
            <TimelineItem
            key={index}
            description={item.description}
            timestamp={item.timestamp}
            location={item.location}
            status={item.status_code}
            />
        ))}
        </ol>
    );
};

Timeline.propTypes = {
  shipment_status: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    timestamp: PropTypes.string,
    location: PropTypes.string,
    status_code: PropTypes.string
  })).isRequired
};

export default Timeline;
