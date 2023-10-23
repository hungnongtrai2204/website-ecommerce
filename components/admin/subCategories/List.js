import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({ categories, subCategories, setSubCategories }) {
  console.log("SubCategories", subCategories);
  return (
    <ul className={styles.list}>
      {subCategories.map((sub) => (
        <ListItem
          subCategory={sub}
          key={sub._id}
          setSubCategories={setSubCategories}
          categories={categories}
        />
      ))}
    </ul>
  );
}
