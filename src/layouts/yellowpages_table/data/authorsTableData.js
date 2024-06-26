/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSoftUIController, setIsLoading } from './../../../context/index';
import PropTypes from 'prop-types';

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import button from "assets/theme/components/button";
import data from "layouts/dashboard/components/Projects/data";

function Author({ image, name, email }) {


  return (
    <>

      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {name}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {email}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}
function dataFun() {


  const [controller, dispatch] = useSoftUIController();
  const { isLoading } = controller;

  const [apiData, SetApiData] = useState([]);
  const [isDeleteOrStart, SetIsDeleteOrStart] = useState(false);
  const [totalPages, SetTotalPages] = useState(10);
  const [pageAndLimit, SetPageAndLimit] = useState({
    page: 1,
    limit: 10
  });

  const baseURL = `https://dynamic-unity-production.up.railway.app`

  useEffect(() => {
    (async () => {
      // console.log(pageAndLimit.page,pageAndLimit.limit)
      setIsLoading(dispatch, true);
      try {
        const response = await axios.get(`${baseURL}/scraper/yellowpages/paginate?page=${pageAndLimit.page}&limit=${pageAndLimit.limit}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        SetTotalPages(response.data.total_pages);
        SetApiData(response.data.data);
        setIsLoading(dispatch, false);
        console.log(response.data.data)
        
      } catch (error) {
        setIsLoading(dispatch, false);
        console.error(error);
      }
    })()
  }, [pageAndLimit, isDeleteOrStart]);

  useEffect(() => {
    console.log(apiData)
    console.log(totalPages)
  }, [apiData])


  const row = apiData.map((eachData, index) => {
    return {
      name: <Author name={`${eachData.name}`} />,
      address: <Function job={`${eachData.address}`} />,
      phone: (
        <Function job={`${eachData.phone}`} />
      ),
      link: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          <Link target="_blank">{eachData.link}</Link>
        </SoftTypography>
      ),
      email: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          <Link target="_blank">{eachData.email}</Link>
        </SoftTypography>
      ),
      regular_hours: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.regular_hours}
        </SoftTypography>
      ),
      claimed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.claimed}
        </SoftTypography>
      ),
      general_info: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.general_info}
        </SoftTypography>
      ),
      services_products: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.services_products}
        </SoftTypography>
      ),
      neighborhoods: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.neighborhoods}
        </SoftTypography>
      ),
      amenities: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.amenities}
        </SoftTypography>
      ),
      languages: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.languages}
        </SoftTypography>
      ),
      aka: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.aka}
        </SoftTypography>
      ),
      social_links: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.social_links}
        </SoftTypography>
      ),
      categories: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.categories}
        </SoftTypography>
      ),
      other_info: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.other_info}
        </SoftTypography>
      ),
      other_links: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {eachData.other_links}
        </SoftTypography>
      ),
      status: (
        // <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
        <Function job={`${eachData.status}`} />
      ),
    }
  })

  const authorsTableData = {
    columns: [
      { name: "name", align: "left" },
      { name: "address", align: "left" },
      { name: "phone", align: "center" },
      { name: "link", align: "center" },
      { name: "email", align: "left" },
      { name: "regular_hours", align: "left" },
      { name: "claimed", align: "left" },
      { name: "general_info", align: "left" },
      { name: "services_products", align: "left" },
      { name: "neighborhoods", align: "left" },
      { name: "amenities", align: "left" },
      { name: "languages", align: "left" },
      { name: "aka", align: "left" },
      { name: "social_links", align: "left" },
      { name: "categories", align: "left" },
      { name: "other_info", align: "left" },
      { name: "other_links", align: "left" },
      { name: "status", align: "center" },
    ],

    rows: row,
    paginationData:
    {
      SetPageAndLimit,
      pageAndLimit,
      totalPages
    },
    SetIsDeleteOrStart,
    isDeleteOrStart
  };
  return authorsTableData
}

dataFun.propTypes = {
  paginationData: PropTypes.object.isRequired
};

export default dataFun;
