// import { useState, useCallback, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Select from 'react-select';
// import transactionsSelectors from '../../redux/transactions/transaction-selectors';
// import transactionOperations from '../../redux/transactions/transaction-operations';
// import {
//   monthInitial,
//   yearInitial,
// } from '../../assets/data/select-data/selectData';
// import styles from './Table.module.scss';

// const colourStyles = {
//   placeholder: base => ({
//     ...base,
//     fontWeight: 400,
//     fontSize: '16px',
//     lineHeight: '1.5',
//     color: '#000000',
//   }),

//   menu: (provided, state) => ({
//     ...provided,
//     padding: 10,
//     background: 'rgba(255, 255, 255, 0.9)',
//     boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
//     borderRadius: '20px',
//   }),

//   indicatorSeparator: (provided, state) => ({
//     ...provided,
//     display: 'none',
//   }),

//   control: styles => ({
//     ...styles,
//     borderRadius: '30px',
//     border: '1px solid #000000',
//     padding: '0 15px',
//     minHeight: '50px',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: '18px',
//     lineHeight: ' 1.5',
//     color: '#000000',
//     backgroundColor: 'transparent',
//     ':hover': { cursor: 'pointer' },
//     '@media screen and (min-width: 768px)': {
//       minWidth: '166px',
//     },
//   }),

//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: 'rgba(255, 255, 255,0.7)',
//     color: '#000000',
//     padding: 20,
//     ':hover': { cursor: 'pointer' },
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: '16px',
//     lineHeight: ' 1.5',
//   }),
// };

// function Table() {
//   const {
//     categoriesSummary,
//     totalSpend,
//     totalIncome,
//     uniqueMonth,
//     uniqueYear,
//   } = useSelector(transactionsSelectors.getStatistics);

//   const backgroundColor = [
//     '#FED057',
//     '#FCBEB1',
//     '#FD9498',
//     '#C5BAFF',
//     '#6E78E8',
//     '#4A56E2',
//     '#81E1FF',
//     '#24CCA7',
//     '#00AD84',
//   ];

//   const [filterData, setFilterData] = useState({
//     month: '',
//     year: '',
//   });

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(transactionOperations.getStatistics(filterData));
//   }, [dispatch, filterData]);

//   const handleChange = useCallback(e => {
//     const {
//       currentTarget: { name, value },
//     } = e;
//     setFilterData(prev => ({ ...prev, [name]: value }));
//   }, []);

//   const onClick = useCallback(e => {
//     e.currentTarget.value = '';
//     const {
//       currentTarget: { name, value },
//     } = e;
//     setFilterData(prev => ({ ...prev, [name]: value }));
//   }, []);

//   const formatSum = sum => {
//     return new Intl.NumberFormat('ua-UA', {
//       maximumFractionDigits: 2,
//       minimumFractionDigits: 2,
//     }).format(sum);
//   };

//   return (
//     <div className={styles.tableContainer}>
//       <div className={styles.selectContainer}>
//         <div className={styles.select}>
//           <Select
//             value={filterData.month}
//             options={uniqueMonth}
//             name="month"
//             onChange={handleChange}
//             onClick={onClick}
//             placeholder={monthInitial}
//             styles={colourStyles}
//           />
//         </div>
//         <div className={styles.select}>
//           <Select
//             value={filterData.year}
//             options={uniqueYear}
//             name="year"
//             onChange={handleChange}
//             onClick={onClick}
//             placeholder={yearInitial}
//             styles={colourStyles}
//           />
//         </div>
//       </div>

//       <div className={styles.categoryContainer}>
//         <ul className={styles.listTitle}>
//           <li className={styles.listTitleText}>Category</li>
//           <li className={styles.listTitleText}>Amount</li>
//         </ul>

//         <ul className={styles.listTransaction}>
//           {categoriesSummary &&
//             Object.keys(categoriesSummary).map((category, index) => {
//               return (
//                 <li className={styles.elementTransaction} key={index}>
//                   <div
//                     style={{
//                       backgroundColor: backgroundColor[index],
//                       width: '24px',
//                       minHeight: '24px',
//                       borderRadius: '2px',
//                       marginRight: '16px',
//                     }}
//                   ></div>
//                   <div className={styles.category}>{category}</div>
//                   <div className={styles.sum}>
//                     {formatSum(categoriesSummary[category])}
//                   </div>
//                 </li>
//               );
//             })}
//         </ul>

//         <ul className={styles.listTotal}>
//           <li className={styles.itemTotal}>
//             <div className={styles.itemText}>Expenses:</div>
//             <div className={styles.itemTextSpend}>{formatSum(totalSpend)}</div>
//           </li>
//           <li className={styles.itemTotal}>
//             <div className={styles.itemText}>Income:</div>
//             <div className={styles.itemTextIncome}>
//               {formatSum(totalIncome)}
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Table;

////////////////////

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Period from '../Period';
import transactionsSelectors from '../../../redux/transactions/transaction-selectors';
import transactionOperations from '../../../redux/transactions/transaction-operations';

import styles from './Table.module.scss';

function Table() {
  const { categoriesSummary, totalSpend, totalIncome, uniqueYear } =
    useSelector(transactionsSelectors.getStatistics);

  const backgroundColor = [
    '#FED057',
    '#FCBEB1',
    '#FD9498',
    '#C5BAFF',
    '#6E78E8',
    '#4A56E2',
    '#81E1FF',
    '#24CCA7',
    '#00AD84',
  ];

  const years = uniqueYear || [];
  const date = new Date();
  const [month, setMonth] = useState(() => date.getUTCMonth() + 1);
  const [year, setYear] = useState(() => date.getFullYear());
  // const [year, setYear] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionOperations.getStatistics({ year, month }));
  }, [dispatch, month, year]);

  const formatSum = sum => {
    return new Intl.NumberFormat('ua-UA', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(sum);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.selectContainer}>
        <Period
          setRequestedMonth={setMonth}
          setRequestedYear={setYear}
          years={years}
        />
      </div>

      <div className={styles.categoryContainer}>
        <ul className={styles.listTitle}>
          <li className={styles.listTitleText}>Category</li>
          <li className={styles.listTitleText}>Amount</li>
        </ul>

        <ul className={styles.listTransaction}>
          {categoriesSummary &&
            Object.keys(categoriesSummary).map((category, index) => {
              return (
                <li className={styles.elementTransaction} key={index}>
                  <div
                    style={{
                      backgroundColor: backgroundColor[index],
                      width: '24px',
                      minHeight: '24px',
                      borderRadius: '2px',
                      marginRight: '16px',
                    }}
                  ></div>
                  <div className={styles.category}>{category}</div>
                  <div className={styles.sum}>
                    {formatSum(categoriesSummary[category])}
                  </div>
                </li>
              );
            })}
        </ul>

        <ul className={styles.listTotal}>
          <li className={styles.itemTotal}>
            <div className={styles.itemText}>Expenses:</div>
            <div className={styles.itemTextSpend}>{formatSum(totalSpend)}</div>
          </li>
          <li className={styles.itemTotal}>
            <div className={styles.itemText}>Incomes:</div>
            <div className={styles.itemTextIncome}>
              {formatSum(totalIncome)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Table;
