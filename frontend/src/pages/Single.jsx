import React, { useEffect } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

function Single() {
    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    return (
        <div className="single">
            <div className="content">
                <img
                    src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                />
                <div className="user">
                    <img
                        src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                    />

                    <div className="info">
                        <span>Ayush</span>
                        <p>Posted 2 days ago</p>
                    </div>

                    <div className="edit">
                        <Link to={"/write?edit=2"}>
                            <img src={Edit} alt="" />
                        </Link>
                        <img src={Delete} alt="" />
                    </div>
                </div>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi, quia?
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio similique velit earum minima. Maxime, omnis. Ipsam
                    debitis, enim tempore harum sint tenetur sequi molestiae
                    accusantium esse eos, obcaecati magni culpa fugit illum
                    magnam vero vitae exercitationem, nam alias eaque quasi
                    beatae et. Atque praesentium dolore neque nam eveniet eaque
                    enim, natus facilis voluptatibus at. Explicabo ducimus,
                    inventore earum qui Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Deleniti accusamus pariatur neque, id
                    rerum commodi. Laborum cupiditate, distinctio tenetur modi
                    laboriosam nam quisquam deleniti veniam quam fugiat, cumque
                    nisi porro vero accusamus architecto? Harum, aliquam
                    deleniti nisi itaque accusantium laudantium ipsum laborum
                    fugiat recusandae. Corrupti facere saepe suscipit porro amet
                    aperiam. Perferendis vel natus adipisci voluptatum enim!
                    Quibusdam non, labore enim nisi odit nostrum perferendis
                    expedita. Ullam pariatur itaque ad reiciendis necessitatibus
                    laboriosam deserunt eaque aspernatur dignissimos, eum,
                    libero natus amet! Assumenda officia incidunt in, blanditiis
                    aspernatur vero nam id veniam quibusdam nihil iste
                    repudiandae voluptatibus dicta sit natus, ratione
                    praesentium harum eius perferendis! Ad architecto
                    dignissimos ipsa soluta corrupti pariatur sapiente! Dolorum
                    nobis incidunt impedit architecto, aperiam ipsa ullam
                    debitis delectus totam deleniti atque aliquid ducimus non
                    harum ea sint est consectetur maxime ut quod! Totam,
                    doloremque dolore distinctio repellat autem iusto atque
                    voluptatibus libero impedit pariatur adipisci, fugit,
                    consequuntur at est delectus ut velit quibusdam voluptatum
                    consequatur? Debitis nemo, itaque temporibus pariatur
                    aperiam beatae animi cum doloribus vitae incidunt deserunt,
                    officiis cumque dolorum consequuntur maxime nostrum. Dolor
                    quia explicabo nihil provident distinctio adipisci, saepe
                    quaerat, quidem voluptates vel eos nemo assumenda deserunt,
                    ipsum inventore numquam ab quo cumque. praesentium quisquam
                    quas ut animi reprehenderit expedita repudiandae facere
                    asperiores officiis laborum minus. Quo accusantium ratione
                    iure perferendis alias ullam ipsa dolore neque corrupti
                    ducimus similique consequatur asperiores, dicta officiis,
                    maxime doloribus quos animi omnis, nesciunt necessitatibus
                    id aspernatur vel doloremque! <br /> Lorem ipsum dolor sit
                    amet consectetur, adipisicing elit. Similique odio fugiat
                    labore earum quod provident suscipit soluta magni quae
                    reprehenderit id in dicta, pariatur dolor modi repudiandae
                    reiciendis sed fuga ipsum dolorem! Eum, recusandae! Soluta
                    asperiores vel deserunt eum corporis nesciunt pariatur
                    voluptates suscipit, consequuntur quod, voluptatum neque
                    quisquam laudantium. <br /> Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Quos sapiente sit minima
                    recusandae modi! Nulla molestias, iste atque fugiat eaque
                    molestiae accusamus laboriosam illo veritatis!
                </p>
            </div>
            <Menu />
        </div>
    );
}

export default Single;
