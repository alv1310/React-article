// import { data } from 'jquery'
import React, { useState, useEffect } from 'react'
import { withRouter, Link, useParams } from 'react-router-dom'
import './ArticleList.scss'
import { BiChevronRight } from 'react-icons/bi'
import { BiRightArrowCircle } from 'react-icons/bi'
import moment from 'moment'

function Category(props) {
  // const { test } = props
  const { aCategoryId } = useParams()
  const [cate, setCate] = useState([])

  // const searchParams = new URLSearchParams('props.location.search')
  // const searchParamsId = searchParams.get('id')

  async function getCategoryFromServer() {
    // 連接的伺服器資料網址
    // const url = 'http://localhost:4000/articles/cate/2'
    const url = `http://localhost:4000/articles/cate/${aCategoryId}`

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('cate data', data)

    // 設定資料
    setCate(data)
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    getCategoryFromServer()
  }, [])

  // ------
  return (
    <>
      <div className="container">
        <div className="row">
          {/* {cate.length &&
            cate.map((value, index) => {
              return ( */}
          <div className="articleTitleGroup mt-3">
            <Link className="articleLogo" to="/articles/">
              <img
                src="../../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </Link>
            <Link className="articlePageTitle ml-2" to="/articles/">
              風格誌 <BiChevronRight />
            </Link>
            <span className="articleBreadCrumb ml-2">露營新手指南</span>
            {/* {cate[0].aCatName} */}
          </div>

          <div className="articleBackToList ml-auto mt-3">
            <Link
              className="nav-link"
              // to="/articles/"
              onClick={() => {
                props.history.goBack()
              }}
            >
              返回一覽列表 <BiRightArrowCircle size="25px" />
            </Link>
          </div>
        </div>

        <div className="row d-flex">
          {cate.length &&
            cate.map((value, index) => {
              return (
                <div key={value.id} className="articleCategoryFilter mt-3 mx-3">
                  <div className="articleCategoryFilterImg">
                    <img
                      src={`../../images/article/${value.aImg}`}
                      alt="article_27"
                    ></img>
                  </div>
                  <div className="articleCategoryFilterText ml-3 mt-3">
                    <Link
                      to={`/articles/a/${value.aId}`}
                      className="articleCategoryTitle mb-3"
                    >
                      <h5>{value.aTitle}</h5>
                    </Link>
                    <span className="articleDate">
                      {moment(value.aDate).format('YYYY-MM-DD')}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="articleAuthor">{value.author}</span>
                    <div className="card-text">
                      <p className="ellipsis mt-3 mb-1">{value.aContent}</p>
                      <Link to={`/articles/a/${value.aId}`}>＋看更多</Link>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default withRouter(Category)
