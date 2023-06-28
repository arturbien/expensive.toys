import { useRouter } from "next/router";
import React from "react";
import { Counter } from "react95";

// TODO: IntersectionObserver to only fetch when in view
const ViewCounter = () => {
  const [views, setViews] = React.useState(0);
  const { asPath } = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
        const { pageViews } = await fetch(
          `/api/page-views?slug=${asPath}`
        ).then((res) => res.json());
        if (pageViews) {
          setViews(pageViews);
        }
      } catch (e) {
        setViews(0);
      }
    })();
  }, [asPath]);

  return (
    <Counter
      value={views}
      minLength={Math.max(views.toString().length + 1, 5)}
    />
  );
};

export default ViewCounter;
