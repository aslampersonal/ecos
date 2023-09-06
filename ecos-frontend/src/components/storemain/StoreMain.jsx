import React from "react";
import "./StoreMain.css";
import SkinCare from "../skincare/SkinCare"
import CosmeticsMain from "../cosmetics/CosmeticsMain";

export default function StoreMain() {
    return (
        <>
            <section id="skincare-sec">
                <SkinCare />
            </section>
            <section id="cosmetics-sec">
                <CosmeticsMain />
            </section>
        </>
    );
}