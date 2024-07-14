import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from './knwoledgeHome.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@mui/material';

const SelectCategories = ({ selectCategories }) => {
  const [categoryValue, setCategoryValue] = useState();
  const [filter, setFilter] = useState('');
  const [mycheckedItems, setmycheckedItems] = useState([]);
  console.log(selectCategories, 'categoryValue');
  const [searchData, setSearchData] = useState([]);
  console.log('searchData =>', searchData);
  const handleCategories = (e, id) => {
    console.log('id =>', id);
    const checked = e.target.checked;
    if (checked) {
      mycheckedItems.push(id);
      setmycheckedItems([...mycheckedItems]);
    } else {
      for (var i = 0; i <= mycheckedItems.length; i++) {
        if (mycheckedItems[i] == id) {
          mycheckedItems.splice(i, 1);
          setmycheckedItems([...mycheckedItems]);
        }
      }
    }
  };
  // let filteredData
  useEffect(() => {
    try {
      const lowercasedFilter = filter && filter.toLowerCase && filter.toLowerCase();
      const filteredData = selectCategories.filter((item) => {
        return Object.keys(item).some(
          (key) => item[key] && item[key].toLowerCase && item[key].toLowerCase().includes(lowercasedFilter),
        );
      });
      setSearchData(filteredData);
    } catch (err) {
      console.log(err);
    }
  }, [selectCategories, filter]);
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const router = useRouter();
  const homeprops = router.pathname;

  return (
    <>
      <details
        style={{ zIndex: 5 }}
        className={homeprops == '/home/UserProfile' ? `${classes.mydropdownMenu}` : `${classes.customSelect} mb-5`}
      >
        <summary
          className={
            homeprops == '/home/UserProfile'
              ? `${classes.mydropdownSummary}`
              : `${classes.radios} ${classes.dropdownInput}`
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Select Category
        </summary>
        <ul className={homeprops == '/home/UserProfile' ? `${classes.mydropdownList}` : `${classes.list}`}>
          <li>
            <div className={`${classes.emailNow} mb-3`}>
              <input
                type="email"
                value={filter}
                className={`${classes.emailInput}`}
                placeholder="Search category..."
                onChange={handleChange}
              />
              <button className={`${classes.emlButton} `}>
                <Image src="/assets/img/dropdownSearch.svg" height="20" width="20" />
              </button>
            </div>
          </li>
          <li>
            <div className="accordion" id="accordionExample">
              {searchData &&
                searchData.map((item) =>
                  item.title == [] ? (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <strong>{item.title}</strong>
                      </AccordionSummary>
                      <AccordionDetails>
                        <label htmlFor={item.id} className="d-flex justify-content-between mb-3">
                          <div style={{ width: '100%' }}>{item.title}</div>
                          <input
                            id={item.id}
                            type="checkbox"
                            onChange={(e) => {
                              handleCategories(e, item.id);
                            }}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                        </label>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <label htmlFor={item.id} className="d-flex justify-content-between mb-3">
                      <div style={{ width: '100%' }}>{item.title}</div>
                      <input
                        id={item.id}
                        type="checkbox"
                        onChange={(e) => {
                          handleCategories(e, item.id);
                        }}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </label>
                  ),
                )}
            </div>
            <div
              style={{
                position: 'sticky',
                bottom: 0,
                zIndex: 10,
                width: '100%',
                background: '#FFFFFF',
                padding: '5px',
                margin: 'auto',
              }}
            >
              <Link
                href={{
                  pathname: '../../kh/SearchKnowledge',
                  query: { name: 'selected Giists', result: JSON.stringify(mycheckedItems) },
                }}
              >
                <div className="d-flex justify-content-center">
                  <Button
                    sx={{ textTransform: 'capitalize' }}
                    className="text-white"
                    style={{
                      backgroundImage: 'linear-gradient(223.45deg, #88edfe -20.39%, #625efe 42.98%, #c224fe 109.21%)',
                    }}
                  >
                    Filter
                  </Button>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </details>
    </>
  );
};
export default SelectCategories;
