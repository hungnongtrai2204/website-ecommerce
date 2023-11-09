import { useState } from "react";
import styles from "./styles.module.scss";
import { sizesList } from "@/data/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Questions({ questions, product, setProduct }) {
  const handleQuestion = (i, e) => {
    const values = [...questions];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };
  const handleRemove = (i) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(i, 1);
      setProduct({ ...product, questions: values });
    }
  };
  return (
    <div>
      <div className={styles.header}>Câu Hỏi</div>
      {questions.length == 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              questions: [
                ...questions,
                {
                  quetion: "",
                  answer: "",
                },
              ],
            });
          }}
        />
      )}
      {questions
        ? questions.map((q, i) => (
            <div className={styles.clicktoadd} key={i}>
              <input
                type="text"
                name="question"
                placeholder="Câu Hỏi"
                value={q.question}
                onChange={(e) => handleQuestion(i, e)}
              />
              <input
                type="text"
                name="answer"
                placeholder="Trả Lời"
                value={q.answer}
                onChange={(e) => handleQuestion(i, e)}
              />
              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      questions: [
                        ...questions,
                        {
                          question: "",
                          answer: "",
                        },
                      ],
                    });
                  }}
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
