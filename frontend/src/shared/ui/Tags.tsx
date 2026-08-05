type TagsProps = {
  list: Array<string>;
}

function Tags({list}: TagsProps) {
  return (
    <div className="flex gap-2">
      {list.map((tag) => (
        <div key={tag} className="rounded-md text-sm px-2 py-1 font-mono text-muted bg-background border border-border">
          #{tag}
        </div>
      ))}
    </div>
  );
}

export default Tags;