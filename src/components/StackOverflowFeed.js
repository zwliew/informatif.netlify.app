import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks";

async function loadApi(page, signal) {
  const res = await fetch(
    `https://api.stackexchange.com/2.2/questions?page=${page}&order=desc&sort=hot&site=stackoverflow`,
    {
      signal
    }
  );
  const items = (await res.json()).items;
  return items.map(
    ({ link, title, score, answer_count, question_id, owner }) => ({
      link,
      title,
      points: score,
      responseCount: answer_count,
      id: question_id,
      author: owner.display_name
    })
  );
}

export default function StackOverflowFeed() {
  const { loading, items, refresh, loadMore } = useApi(loadApi);
  return (
    <Feed
      title="Stack Overflow"
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
      loading={loading}
    />
  );
}