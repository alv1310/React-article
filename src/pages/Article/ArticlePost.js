import React, { useState, useEffect } from 'react'
import { withRouter, Link, useParams } from 'react-router-dom'
import './ArticleList.scss'
import { BiChevronRight } from 'react-icons/bi'
import { BiRightArrowCircle } from 'react-icons/bi'
// import { BsMoon } from 'react-icons/bs'
import moment from 'moment'
// import ArticleCarousel from '../../components/ArticleCarousel'
import SliderboxArti from '../../components/SliderboxArti'
import ACommentLine from '../../components/ACommentLine'
import AComment from '../../components/AComment'

function ArticlePost(props) {
  const { aId } = useParams()
  const [post, setPost] = useState([])
  const [articleTag, setArticleTag] = useState([])
  const [tagFilter, setTagFilter] = useState([])
  const [tagId, setTagId] = useState([])
  const [comment, setComment] = useState([])

  // 取得文章內容
  async function getArticlePostFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/a/${aId}`
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
    console.log('article data', data)
    // 設定資料
    if (data) setPost(data)
  }

  // 取得文章多個標籤
  async function getArticleTagFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/a/tag/${aId}`
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log('tags data', data)
    // 設定資料
    if (data) setArticleTag(data)
  }

  // 取得標籤篩選結果
  async function getTagFilterFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/tags/${tagId}`
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log('data tag filters', data)
    // 設定資料
    setTagFilter(data)
  }

  // 取得留言
  async function getCommentFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/comment`
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log('comment data', data)
    // 設定資料
    if (data) setComment(data)
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    getArticlePostFromServer()
    getArticleTagFromServer()
    // getTagFilterFromServer()
    // getCateNameFromServer()
  }, [])

  // ------
  return (
    <>
      <div className="container">
        <div className="row">
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
            <span className="articleBreadCrumb ml-2">{post.aCatName}</span>
          </div>

          <div className="articleBackToList ml-auto mt-3">
            <Link
              className="nav-link"
              onClick={() => {
                props.history.goBack()
              }}
            >
              返回一覽列表 <BiRightArrowCircle size="25px" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container articlePostMain">
        <div className="a-wrapper"></div>

        <div className="row">
          <div className="articlePostBox mx-auto" id="wrapper">
            <div className="articlePostPic1">
              <img
                src={`../../images/article/${post.aImg}`}
                alt="article_post_picL"
                className="article_post_picL"
              />
            </div>

            <div className="a_divider"></div>

            <div className="articlePostPic2">
              <img
                src={`../../images/article/${post.aImg2}`}
                alt="article_post_picS"
                className="article_post_picS"
              />
            </div>

            <div className="a_divider"></div>

            <div className="articlePostTitle">
              <div className="card-body mx-auto">
                <h5 className="card-title my-3">{post.aTitle}</h5>
                <span className="articleDate">
                  {moment(post.aDate).format('YYYY-MM-DD')}
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="articleAuthor">作者：{post.author}</span>
              </div>
            </div>

            <p className="articlePostContent">{post.aContent}</p>

            <div className="articlePostManualPic">
              <img src={`../../images/article/${post.aImg3}`} alt=""></img>
            </div>
          </div>
        </div>
      </div>

      {/* ------------ 影片部分 -------------- */}
      {/* <div className="container">
        <div className="row">
          <div className="articlePostManualVid">
            <video width="960" height="600" controls muted autoplay>
              <source
                src="../../images/article/campFire.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div> */}

      {/* ------------ 標籤部分 -------------- */}

      <div className="container my-5">
        <div className="row">
          <div className="articleTitleGroup mt-3">
            <span className="articleLogo ">
              <img
                src="../../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            <span className="articlePageTitle ml-2 mr-3">熱門主題</span>
          </div>

          {articleTag.length &&
            articleTag.map((value, index) => {
              return (
                <div key={value.id} className="articleTagGroup mt-2 d-flex">
                  <Link
                    className="nav-link"
                    onClick={() => {
                      setTagFilter(tagFilter)
                      setTagId(value.tagId)
                    }}
                    to={`/articles/tags/${value.tagId}`}
                  >
                    {value.tagName}
                  </Link>
                </div>
              )
            })}
        </div>
      </div>

      {/* ------------ 相關商品 -------------- */}
      <div className="container">
        <div className="row">
          <div className="articleTitleGroup mt-3">
            <span className="articleLogo ">
              <img
                src="../../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            <span className="articlePageTitle ml-2 mr-3">推薦品項</span>
          </div>
        </div>
      </div>

      <div className="container articleTagProduct mt-3">
        <div className="row">
          <div className="articleTagProductGroup mt-3">
            <div className="articleTagProductCarousel mt-5 mx-auto">
              {/* ------- CAROUSEL STARTS HERE ------- */}
              {/* <ArticleCarousel /> */}

              <SliderboxArti
                source={`http://localhost:4000/product/aid/${aId}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --------------- 留言板 -------------- */}
      <div className="container">
        <div className="row">
          <div className="articleTitleGroup mt-5">
            <span className="articleLogo ">
              <img
                src="../../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            <span className="articlePageTitle ml-2 mr-3">會員留言</span>
          </div>
        </div>

        {/* ------ 輸入留言 ----- */}

        <div className="row articleComment form-group mt-3 flex-column">
          {sessionStorage.getItem('mId') === '1' ? (
            <AComment getCommentFromServer={getCommentFromServer} />
          ) : (
            <Link to="/Login" className="mt-1 mb-3 articleLogin">
              歡迎登入會員留言
            </Link>
          )}
        </div>

        {/* ------ 留言紀錄 ------ */}
        <ACommentLine
          comment={comment}
          setComment={setComment}
          getCommentFromServer={getCommentFromServer}
        />

        {/*  */}
      </div>
    </>
  )
}

export default withRouter(ArticlePost)
