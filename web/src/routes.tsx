import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TeacherList from "./pages/TeacherList";
import Landing from "./pages/Landing";
import TeacherForm from "./pages/TeacherForm";

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    );
}