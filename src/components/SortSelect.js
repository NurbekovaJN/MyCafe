
import { Select } from 'antd';


const handleChange = value => {
  console.log(`selected ${value}`);
}

const SortingApp = () => (
  <Select
    defaultValue="По цене"
    style={{ width: 200, textAlign: 'left' }}
    onChange={handleChange}
    options={[
      {
        label: <span>По цене</span>,
        title: 'price',
        options: [
          { label: <span>Дороже</span>, value: 'Дороже' },
          { label: <span>Дешевле</span>, value: 'Дешевле' },
        ],
      },
      {
        label: <span>По рейтингу</span>,
        title: 'rating',
        options: [
          { label: <span>Выше</span>, value: 'Выше' },
          { label: <span>Ниже</span>, value: 'Ниже' },
        ],
      },
      {
        label: <span>По названию</span>,
        title: 'name',
        options: [
          { label: <span>А-Я</span>, value: 'А-Я' },
          { label: <span>Я-А</span>, value: 'Я-А' },
        ],
      },
    ]}
  />
);
export default SortingApp;