import { useSpring, useSpringRef, animated } from "@react-spring/web";

const Homepage = () => {
  const api = useSpringRef();
  const springs = useSpring({
    ref: api,
    from: { x: 0 },
  });

  const handleClick = () => {
    api.start({
      to: {
        x: springs.x.get() === 827 ? 0 : 827,
      },
    });
  };

  return (
    <div>
      <h1 className="text-[100px] font-bold mb-10">페이지 구조 변경 중</h1>
      <div className="flex">
        <animated.div
          onClick={handleClick}
          style={{
            width: 80,
            height: 80,
            background: "#ff6d6d",
            borderRadius: 8,
            ...springs,
          }}
        />
      </div>
    </div>
  );
};

export default Homepage;
