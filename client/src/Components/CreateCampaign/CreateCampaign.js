import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PermissionChecker from '../Common/PermissionChecker/PermissionChecker';
import { ADMIN, MANAGER } from '../../config/constants';
import Message from '../Elements/Message/Message';
import { RESTRICTED_ACCESS } from '../../config/messages';
import classes from './CreateCampaign.module.css';
import Header from '../Common/Header/Header';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import DateInput from '../Elements/DateInput/DateInput';
import Chip from '../Elements/Chip/Chip';
import Checkbox from '../Elements/Checkbox/Checkbox';
import Plus from '../Elements/Icons/plus.svg';
import CreateBrand from '../CreateBrand/CreateBrand';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
import Label from '../Elements/Label/Label';
import Toggle from '../Elements/Toggle/Toggle';
import { Create, getAll } from '../../helpers/ApiService';
import { NUMBER_DOT_MASK } from '../../config/regexp.enum';

function CreateCampaign() {
  const access_token = useSelector(({ access_token }) => access_token);
  const dispatch = useDispatch();

  const [campaign, setCampaign] = useState({
    title: '',
    status: '',
    effort: '',
    startDate: '',
    endDate: '',
    hashtags: null,
    brand: '',
    avatar: null,
    budgetsTargets: {
      totalBudget: '',
      budgets: {
        influencerBudget: '',
        socialAdsMediaBudget: '',
        productionBudget: '',
        travelBudget: '',
        handlingFee: '',
        otherBudget: '',
      },
    },
  });
  const [brandList, setBrandList] = useState([]);
  const [managersList, setManagersList] = useState([]);
  const [hashtagsIncluded, setHashtagsIncluded] = useState(true);
  const [budgetIncluded, setBudgetIncluded] = useState({
    influencerBudget: true,
    socialAdsMediaBudget: true,
    productionBudget: true,
    travelBudget: true,
    handlingFee: true,
  });
  const [brandCreation, setBrandCreation] = useState(false);
  const [budgetMismatch, setBudgetMismatch] = useState(null);

  useEffect(() => {
    getAll('http://localhost:5000/user', access_token)
      .then((res) => {
        const managers = res.filter((user) => user.role === MANAGER);
        setManagersList(managers);
      });
  }, []);
  useEffect(() => {
    getAll('http://localhost:5000/campaign/brand', access_token)
      .then((res) => {
        setBrandList(res);
      });
  }, []);

  useEffect(() => (!budgetIncluded ? setCampaign((prevState) => ({
    ...prevState,
    budgetsTargets: {
      totalBudget: '',
      budgets: {
        influencerBudget: '',
        socialAdsMediaBudget: '',
        productionBudget: '',
        travelBudget: '',
        handlingFee: '',
        otherBudget: '',
      },
    },
  })) : null), [budgetIncluded]);

  useEffect(() => (!hashtagsIncluded ? setCampaign((prevState) => ({ ...prevState, hashtags: null })) : null), [hashtagsIncluded]);

  const inputHandler = (event) => {
    setCampaign(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };
  const inputBudgetHandler = (event) => {
    if (event.target.id === 'totalBudget') {
      setCampaign(((prevState) => ({
        ...prevState,
        budgetsTargets: {
          ...prevState.budgetsTargets,
          [event.target.id]: Number(event.target.value.replace('$ ', '').replaceAll('.', '')),
        },
      })));
    }
    setCampaign(((prevState) => ({
      ...prevState,
      budgetsTargets: {
        ...prevState.budgetsTargets,
        budgets: {
          ...prevState.budgetsTargets.budgets,
          [event.target.id]: Number(event.target.value.replace('$ ', '').replaceAll('.', '')),
        },
      },
    })));
  };
  const dropdownHandler = (key, value) => {
    setCampaign(((prevState) => ({ ...prevState, [key]: value.key })));
  };

  const dateHandler = (key, date) => {
    setCampaign(((prevState) => ({ ...prevState, [key]: date })));
  };
  const hashtagsHandler = (chips) => {
    setCampaign(((prevState) => ({ ...prevState, hashtags: chips })));
  };

  const checkHandler = (setState) => {
    setState((prevCheck) => !prevCheck);
  };
  const toggleHandler = (key, checked) => {
    setBudgetIncluded((prevState) => ({ ...prevState, [key]: checked }));
  };

  const budgetValidator = () => {
    setBudgetMismatch(false);

    const {
      totalBudget,
      budgets: {
        influencerBudget,
        socialAdsMediaBudget,
        productionBudget,
        travelBudget,
        handlingFee,
        otherBudget,
      },
    } = campaign.budgetsTargets;

    const result = influencerBudget + socialAdsMediaBudget + productionBudget + travelBudget + handlingFee + otherBudget;

    if (result > totalBudget) {
      const mismatch = result - totalBudget;
      setBudgetMismatch(`Budgets below are $${mismatch.toString().replace(NUMBER_DOT_MASK, '$1.')} over the Total Budget`);
    }
    if (result < totalBudget) {
      const mismatch = totalBudget - result;
      setBudgetMismatch(`Budgets below are $${mismatch.toString().replace(NUMBER_DOT_MASK, '$1.')} less than the Total Budget`);
    }
  };

  useEffect(() => budgetValidator(), [campaign.budgetsTargets]);
  useEffect(() => (!hashtagsIncluded ? setCampaign((prevState) => ({ ...prevState, hashtags: null })) : hashtagsHandler()), [hashtagsIncluded]);

  const createCampaignHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('json', JSON.stringify(campaign));

    const status = await Create('http://localhost:5000/campaign', formData, access_token, dispatch);
    status === 201 ? props.history.push('/campaigns') : null;
  };

  return (
    <PermissionChecker
      permission={[ADMIN, MANAGER]}
      display={<Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={RESTRICTED_ACCESS} redirect />}
    >
      <form className={classes.mainContainer} onSubmit={(event) => createCampaignHandler(event)}>
        <Header arrow title='Create Campaign' button='saveChanges' disabled={budgetMismatch} />
        <div className={classes.topContainer}>
          <div className={classes.leftContainer}>
            <h4 className={classes.h4}>Basic Information</h4>
            <Input
              label="Title"
              htmlFor='title'
              type='text'
              id="title"
              required
              onChange={(event) => inputHandler(event)}
            />
            <Dropdown
              label="Status"
              name="status"
              options={[
                <div className={classes.dropdownOption} key='Requested'>
                  <div className={classes.dot} style={{ backgroundColor: '#D9AD42' }} />
                  Requested
                </div>,
                <div className={classes.dropdownOption} key='Pre-phase'>
                  <div className={classes.dot} style={{ backgroundColor: '#B14AC2' }} />
                  Pre-phase
                </div>,
                <div className={classes.dropdownOption} key='Running'>
                  <div className={classes.dot} style={{ backgroundColor: '#1778B0' }} />
                  Running
                </div>,
                <div className={classes.dropdownOption} key='Done'>
                  <div className={classes.dot} style={{ backgroundColor: '#54A880' }} />
                  Done
                </div>,
              ]}
              onChange={(value) => dropdownHandler('status', value)}
              required
            />
            <Dropdown
              label="Effort"
              name="effort"
              options={[
                <div className={classes.dropdownOption} key='Not set'>
                  <div className={classes.dot} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC' }} />
                  Not set
                </div>,
                <div className={classes.dropdownOption} key='Low'>
                  <div className={classes.dot} style={{ backgroundColor: '#5DC983' }} />
                  Low
                </div>,
                <div className={classes.dropdownOption} key='Medium'>
                  <div className={classes.dot} style={{ backgroundColor: '#FBA63C' }} />
                  Medium
                </div>,
                <div className={classes.dropdownOption} key='High'>
                  <div className={classes.dot} style={{ backgroundColor: '#ED6B3E' }} />
                  High
                </div>,
              ]}
              onChange={(value) => dropdownHandler('effort', value)}
              required
            />
            <div className={classes.datesContainer}>
              <DateInput
                setState={(date) => dateHandler('startDate', date)}
                selected={campaign.startDate}
                label='Start Date'
                input='shortInput'
                calendar='shortCalendar'
              />
              <DateInput
                setState={(date) => dateHandler('endDate', date)}
                selected={campaign.endDate}
                label='End Date'
                input='shortInput'
                calendar='shortCalendar'
              />
            </div>
            <Chip
              setState={hashtagsHandler}
              disabled={!hashtagsIncluded}
            />
            <Checkbox message="Campaign won't have a hashtag" onClick={() => checkHandler(setHashtagsIncluded)} />
            <div className={classes.clientContainer}>
              <h4 className={classes.h4}>Client</h4>
              <Dropdown
                label="Brand"
                name="brand"
                onChange={(value) => dropdownHandler('brand', value)}
                options={brandList.map((brand) => brand.name)}
                required
              />
              <label className={classes.addBrandLabel} onClick={() => checkHandler(setBrandCreation)}>
                <img src={Plus} alt='Add New Brand' />
                &nbsp;
                Add New Brand
              </label>
            </div>
          </div>
          <div className={classes.rightContainer}>
            <div>
              <h4 className={classes.h4}>Roles</h4>
              <Dropdown
                label="Team Lead"
                name="teamLead"
                onChange={(value) => dropdownHandler('teamLead', value)}
                options={managersList.map((manager) => `${manager.firstName} ${manager.lastName}`)}
                required
              />
            </div>
            <div className={classes.miscContainer}>
              <h4 className={classes.h4}>Misc.</h4>
              <PictureLoader label="Campaign Logo" setState={setCampaign} alt="Campaign Logo" />
              <Label label="Client Description" htmlFor='description' />
              <textarea id="description" name="description" className={classes.textArea} />
              <Label label="Internal Notes" htmlFor='notes' />
              <textarea id="notes" name="notes" className={classes.textArea} />
              <div className={classes.campaignLogsContainer}>
                <Label label="Campaign Created" />
                -
                <Label label="Last Campaign Updated" />
                -
              </div>
            </div>
          </div>
        </div>
        <span className={classes.separator} />
        <div className={classes.bottomContainer}>
          <h4 className={classes.h4}>Budgets & Targets</h4>
          <Checkbox message="Campaign won't have a budget" onClick={() => checkHandler(setBudgetIncluded)} />
          { budgetIncluded
            ? (
              <div>
                <Input
                  input='masked'
                  prefix='$ '
                  placeholder='$'
                  label="Total Budget"
                  htmlFor='totalBudget'
                  type='totalBudget'
                  id="totalBudget"
                  required
                  onChange={(event) => inputBudgetHandler(event)}
                />
                { budgetMismatch ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} message={budgetMismatch} /> : null }
                <div className={classes.budgetContainer}>
                  <Toggle onClick={(checked) => toggleHandler('influencerBudget', checked)} />
                  <Input
                    input='masked'
                    prefix='$ '
                    placeholder='$'
                    label="Influencer Budget"
                    htmlFor='influencerBudget'
                    type='influencerBudget'
                    id="influencerBudget"
                    required={budgetIncluded.influencerBudget}
                    disabled={!budgetIncluded.influencerBudget}
                    onChange={(event) => inputBudgetHandler(event)}

                  />
                </div>
                <div className={classes.budgetContainer}>
                  <Toggle onClick={(checked) => toggleHandler('socialAdsMediaBudget', checked)} />
                  <Input
                    input='masked'
                    prefix='$ '
                    placeholder='$'
                    label="Social Ads Budget"
                    htmlFor='socialAdsMediaBudget'
                    type='socialAdsMediaBudget'
                    id="socialAdsMediaBudget"
                    required={budgetIncluded.socialAdsMediaBudget}
                    disabled={!budgetIncluded.socialAdsMediaBudget}
                    onChange={(event) => inputBudgetHandler(event)}

                  />
                </div>
                <div className={classes.budgetContainer}>
                  <Toggle onClick={(checked) => toggleHandler('productionBudget', checked)} />
                  <Input
                    input='masked'
                    prefix='$ '
                    placeholder='$'
                    label="Production Budget"
                    htmlFor='productionBudget'
                    type='productionBudget'
                    id="productionBudget"
                    required={budgetIncluded.productionBudget}
                    disabled={!budgetIncluded.productionBudget}
                    onChange={(event) => inputBudgetHandler(event)}

                  />
                </div>
                <div className={classes.budgetContainer}>
                  <Toggle onClick={(checked) => toggleHandler('travelBudget', checked)} />
                  <Input
                    input='masked'
                    prefix='$ '
                    placeholder='$'
                    label="Travel Budget"
                    htmlFor='travelBudget'
                    type='travelBudget'
                    id="travelBudget"
                    required={budgetIncluded.travelBudget}
                    disabled={!budgetIncluded.travelBudget}
                    onChange={(event) => inputBudgetHandler(event)}

                  />
                </div>
                <div className={classes.budgetContainer}>
                  <Toggle onClick={(checked) => toggleHandler('handlingFee', checked)} />
                  <Input
                    input='masked'
                    prefix='$ '
                    placeholder='$'
                    label="Handling Budget"
                    htmlFor='handlingFee'
                    type='handlingFee'
                    id="handlingFee"
                    required={budgetIncluded.handlingFee}
                    disabled={!budgetIncluded.handlingFee}
                    onChange={(event) => inputBudgetHandler(event)}

                  />
                </div>
                <div className={classes.budgetContainer}>
                  <Toggle onClick={(checked) => toggleHandler('otherBudget', checked)} />
                  <Input
                    input='masked'
                    prefix='$ '
                    placeholder='$'
                    label="Other Budget"
                    htmlFor='otherBudget'
                    type='otherBudget'
                    id="otherBudget"
                    required={budgetIncluded.otherBudget}
                    disabled={!budgetIncluded.otherBudget}
                    onChange={(event) => inputBudgetHandler(event)}

                  />
                </div>
              </div>
            )
            : null}
        </div>
      </form>
      { brandCreation
        ? (
          <CreateBrand setState={setBrandCreation} />
        )
        : null}
    </PermissionChecker>
  );
}

export default CreateCampaign;
