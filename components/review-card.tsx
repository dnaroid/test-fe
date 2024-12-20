import {Review} from "@/config/models"

type Props = {
  review: Review
}

export default function ReviewCard({review: {author, rating, title, content, createdAt}}: Props) {
  return <article className="flex flex-col bg-[var(--bgprimary)] p-3 gap-1 text-[var(--foreground)]">
    <p className="text-[20px] font-bold">{"⭐⭐⭐⭐⭐".slice(-rating)} "{title}"</p>
    <p>{content}</p>
    <p className="text-[13px] font-light flex justify-between w-full">
      <span>{author}, {(new Date(createdAt)).toLocaleDateString()}</span>
    </p>
  </article>
}
