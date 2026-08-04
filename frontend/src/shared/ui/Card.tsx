type CardProps = {
  children: React.ReactNode;
  hoverable?: boolean;
}

function Card({children, hoverable=false}: CardProps) {
  return (
    <div className={`bg-surface border border-border rounded-card shadow-card p-6 ${hoverable ? 'hover:shadow-lg' : ''}`}>
      {children}
    </div>
    );
}

export default Card;