import React from "react";
import { AnimationRoutes, Page } from "zmp-ui";
import { Route } from "react-router-dom";

import Home from "../../pages/home";
import Coupon from "../../pages/coupon";
import Contact from "../../pages/contact";
import Booking from "../../pages/booking";
import BookingChooseBranch from "../../pages/bookingchoosebranch";
import CreateBooking from "../../pages/createbooking";
import ProductPage from "../../pages/product";
import FormInformation from "../../pages/formInfomation";
import ConfirmInformation from "../../pages/confirmInformation";
import DetailsBooking from "../../pages/detailsbooking";

const Layout = () => {
  return (
    <Page
      hideScrollbar
      style={{ maxHeight: "100vh" }}
      className="overflow-scroll bg-[var(--background-grey)]"
    >
      <AnimationRoutes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/coupon" element={<Coupon />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/product" element={<ProductPage />}></Route>
        <Route path="/forminformation" element={<FormInformation />} />
        <Route path="/branches" element={<BookingChooseBranch />}></Route>
        <Route path="/createbooking/:branch_id" element={<CreateBooking />}></Route>
        <Route
          path="/confirminformation"
          element={<ConfirmInformation />}
        ></Route>
        <Route path="/detailsBooking/:id?" element={<DetailsBooking />}></Route>
      </AnimationRoutes>
    </Page>
  );
};

export default Layout;
