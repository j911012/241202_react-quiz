import React, { useReducer, ChangeEvent } from "react";
import "./styles.css";

// 状態の型定義
interface State {
  count: number;
  step: number;
}

// アクションの型定義
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_COUNT"; payload: number }
  | { type: "SET_STEP"; payload: number }
  | { type: "RESET" };

// リデューサー関数の実装
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return { count: 0, step: 1 };
    default:
      return state;
  }
};

// DateCounterコンポーネントの定義
const DateCounter: React.FC = () => {
  // useReducerの使用
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  // 調整後の日付を計算
  const date = new Date();
  date.setDate(date.getDate() + state.count);

  // イベントハンドラーの実装
  const dec = () => dispatch({ type: "DECREMENT" });

  const inc = () => dispatch({ type: "INCREMENT" });

  const defineCount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      dispatch({ type: "SET_COUNT", payload: value });
    }
  };

  const defineStep = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      // ステップは0以上
      dispatch({ type: "SET_STEP", payload: value });
    }
  };

  const reset = () => dispatch({ type: "RESET" });

  return (
    <div className="counter">
      {/* ステップを調整するスライダー */}
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      {/* カウントを調整するボタンと入力フィールド */}
      <div>
        <button onClick={dec}>-</button>
        <input
          type="number"
          value={state.count}
          onChange={defineCount}
          min={-Infinity}
          max={Infinity}
        />
        <button onClick={inc}>+</button>
      </div>

      {/* 調整後の日付を表示 */}
      <p>{date.toDateString()}</p>

      {/* リセットボタン */}
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default DateCounter;
