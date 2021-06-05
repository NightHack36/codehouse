import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Btn } from ".";
import {
  FiBookmark,
  FiExternalLink,
  FiMessageCircle,
  FiTriangle,
} from "react-icons/fi";
import axios from "axios";

const Item = ({ data, listView }) => {
  const [meta, setMetadata] = useState([]);
  const [description, setDescription] = useState();
  const [image, setImage] = useState("/assets/image-not-found.jpg");

  const { cheatsheet_name, website_url, category, twitter_handle } = data;

  useEffect(() => {
    axios
      .get(`https://meta-scrapper-api.herokuapp.com/api?url=${website_url}`)
      .then(async (response) => {
        await setMetadata(response.data);
        await setDescription(meta.meta.description);
        if (response.data.og.image) {
          await setImage(response.data.og.image);
        } else {
          await setImage("/assets/image-not-found.jpg");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return meta.meta && listView ? (
    <div className="flex items-center p-4 rounded-md duration-500 white-light-shadow bg-white m-2 w-10/12 border border-[#ddd] hover:border-[#3d5eff98] item-hover-text">
      <div className="w-[250px] relative h-full">
        <Link href="/new">
          <a>
            <img
              src={
                meta.og && meta.og.image
                  ? meta.og.image
                  : "/assets/image-not-found.jpg"
              }
              alt=""
              width="250"
              className="rounded-md w-full"
            />
          </a>
        </Link>
        <Btn className="rounded-md ml-1 absolute top-1 right-1">
          <div className="bg-[#ffffff] p-2 text-[#F5BA31] duration-500 text-md capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins">
            <FiBookmark className="text-md span duration-500" />
          </div>
        </Btn>
      </div>
      <div className="w-9/12 h-full px-3 py-5 flex items-start justify-between flex-col">
        <Link href="/new">
          <a>
            <h1 className="font-bold text-xl duration-500 hover:text-[#3d5eff]">
              {cheatsheet_name}
            </h1>
            <p className="text-[12px] text-[#666] mt-1">
              {meta.meta && meta.meta.description
                ? meta.meta.description.slice(0, 150)
                : "Description not found"}
            </p>
          </a>
        </Link>
        <div className="flex items-center justify-start mt-1 w-full">
          <Btn className="rounded-md">
            <div className="shine bg-[#3d5eff] text-white duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins">
              80
              <FiTriangle className="text-sm ml-1 span duration-500" />
            </div>
          </Btn>
          <Btn className="rounded-md ml-1">
            <div className="border border-[#3d5eff] text-[#3d5eff] duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins">
              4
              <FiMessageCircle className="text-sm ml-1 span duration-500" />
            </div>
          </Btn>
          <Btn className="ml-1">
            <div className="text-[#3d5eff] duration-500 px-2 py-3 h-full text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins">
              <FiExternalLink className="text-sm span duration-500" />
            </div>
          </Btn>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-between flex-col p-5 rounded-md duration-500 white-light-shadow bg-white m-2 w-3/12 border border-[#ddd] hover:border-[#3d5eff98] item-hover-text">
      <div className="block">
        <div className="w-full relative">
          <Link href="/new">
            <a>
              <img
                src={
                  meta.og && meta.og.image
                    ? meta.og.image
                    : "/assets/image-not-found.jpg"
                }
                alt=""
                width="300"
                className="rounded-md w-full mb-2 h-[157.5px]"
              />
            </a>
          </Link>
          <Btn className="rounded-md ml-1 absolute top-1 right-1">
            <div className="bg-[#ffffff] p-2 text-[#F5BA31] duration-500 text-md capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins">
              <FiBookmark className="text-md span duration-500" />
            </div>
          </Btn>
        </div>
        <Link href="/new">
          <a>
            <h1 className="font-bold text-lg duration-500 hover:text-[#3d5eff]">
              {cheatsheet_name.length > 50
                ? cheatsheet_name.slice(0, 50) + "..."
                : cheatsheet_name}
            </h1>
            <p className="text-[12px] text-[#666] mt-1">
              {meta.meta && meta.meta.description
                ? meta.meta.description.slice(0, 150)
                : "description not found"}
            </p>
          </a>
        </Link>
      </div>
      <div className="flex items-center justify-start mt-1 w-full">
        <Btn className="rounded-md">
          <div className="shine bg-[#3d5eff] text-white duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins">
            80
            <FiTriangle className="text-sm ml-1 span duration-500" />
          </div>
        </Btn>
        <Btn className="rounded-md ml-1">
          <div className="border border-[#3d5eff] text-[#3d5eff] duration-500 px-4 py-2 text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins">
            4
            <FiMessageCircle className="text-sm ml-1 span duration-500" />
          </div>
        </Btn>
        <Btn className="ml-1">
          <div className="text-[#3d5eff] duration-500 px-2 py-3 h-full text-sm capitalize rounded-lg font-semibold flex items-center justify-center menu-animation-hover poppins">
            <FiExternalLink className="text-sm span duration-500" />
          </div>
        </Btn>
      </div>
    </div>
  );
};

export default Item;
