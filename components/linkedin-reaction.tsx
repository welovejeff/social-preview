type ReactionType = 'like' | 'celebrate' | 'support' | 'love' | 'insightful' | 'funny';

interface LinkedInReactionProps {
  type: ReactionType;
  size?: number;
  active?: boolean;
  onClick?: () => void;
}

const reactionColors = {
  like: '#0A66C2',
  celebrate: '#44712E',
  support: '#7A3ED5',
  love: '#B24020',
  insightful: '#DAA520',
  funny: '#F5B668'
};

const LinkedInReaction = ({ type, size = 24, active = false, onClick }: LinkedInReactionProps) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 rounded p-1 transition-colors ${
        active ? 'text-[' + reactionColors[type] + ']' : 'text-gray-500 hover:text-[' + reactionColors[type] + ']'
      }`}
    >
      <svg
        width={size}
        height={size}
        className={`transition-colors ${
          active ? 'fill-current' : 'fill-none stroke-current group-hover:fill-current'
        }`}
      >
        <use href={`#linkedin-${type}`} />
      </svg>
    </button>
  );
};

export default LinkedInReaction; 