// import React, { useState } from "react"
// import TinderCard from "react-tinder-card";
// import "./TinderCards.css"

// function TinderCards() {
//     const [people, setPeople] = useState([
//         {
//             name: "Elon Musk",
//             url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society_%28crop1%29.jpg"
//         },
//         {
//             name: "Jeff Bezos",
//             url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society_%28crop1%29.jpg"
//         }
//     ])

//     const swiped = (direction, nameToDelete) => {
//         console.log("removing: " + nameToDelete)
//         // setLastDirection(direction)
//     };

//     const outOfFrame = (name) => {
//         console.log(name + " left the screen!")
//     }

//     return (
//         <div className="tinderCards">
//             <div className="tinderCards__cardContainer">
//                 {people.map((person) => (
//                     <TinderCard
//                     className="swipe"
//                         key={person.name}
//                         preventSwipe={["up", "down"]}
//                         onSwipe={(dir) => swiped(dir, person.name)}
//                         onCardLeftScreen={() => outOfFrame(person.name)}>
                        
//                     </TinderCard>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default TinderCards


import React, { useState,useEffect } from 'react';
import "./TinderCards.css";
import TinderCard from 'react-tinder-card';
import axios from './axios';

function TinderCards() {
    const [people, setPeople] = useState([
        {
            name: "Elon Musk",
            url: "data:image/webp;base64,UklGRpwVAABXRUJQVlA4IJAVAABwqACdASo4ATgBPvlurlGqpjyvK3JMk5AfCU274X6TJRJBM5fVlTzHG76OnHf1QwufS7+tP8F43SQmLXquQQGRBtEvmZQZlJj7zLj3iG6ddtaKoRhncuxB9MYYo28LEtR6mG6Ka8qrdNIoUuWllcbGRf4HUxpezkt7wv6sw8usl/JDY1oyHZhOPiz3hqS/gFsNjig+1Tlbx+mpwiVGD2cjjQ317wbnp3EpDiIBwIM4pE3LCnoFHJPpT68vb/aMFlzgN3CMYNeqDGUWpYPkb7qI6QecR/KcM4m3T8A2VId3gyGaxLcIRjz+7XgUSHfi3crqKdGSlrZjCzUzbU9NGBtlrlmH+ZqXH20NH1wmVwoHxvQzq8tlIKl4IkgijQ2YY2VIVFCfiP7gWRNVuQT15zrRT2w1p1lYYImb5KKvYXkrYyPzOnQMBEhSbftcs8XxF9+7zqu2mUedQUUKZdUFpdfJX7gyLGX+7jEMHLXqaOiDzmznKjMIjLeZRqMwi3dsjNXTtLlgtZmgfLOOws2uaDz3QlMupCAXBvGdKKlAq2zQc5+yXG0+q4ivSETvy49FUs9eeBXaQnVy4paldMaV4djj9oROOx0HLcEY4DlnlbftkNaB2+JBcKTpHpCtRpQCEUWCXCxkPxA5ZbADL9y5BPJG7F++YGnV818DgBkEpo5OgWYBG1DD7tON197MoIb2ZuVWdSpaLk+gF6MC4PXMS6IPv6iENr2ndBPQuD3VTeoNJ4U0PvM1PqvHdyuIq4HCbYvjx7acHe5oyXqQDjpHjBUnorGtrlpS60iIYRA8mzOCpK7w1Wg7jZjMBb/RUuiL2MO3qb5wi3K8DF909xkhwHz6iTQ5+cjGDw0IRflVpb+Br2hx4qx7xMx4yNe9ZOAJLESWMc+KG/DpiLpxqC2ULvDYPl8xgtMfsw17wQOIAh1BDnPZYw+JLQuAxuGoOv9PNy7kyiBPV+brDymnNOljA4jiWNsxAx+eAjMiMuRtdharzoowmO43PKvI/D1Xdpz0dw5M4kP++hXUNa4pPhFrCkNWQD8niXzjZt5MTEakC+tc+AotE5ZeJvvyOPOv4qQqLFQSGHKxW9kEeuNdIZ2Nv/LThljfA42O6Ks71B82+89cgfzdfyldOJUGcLdtw58STvHsRGk/qv/2dkgYKwUjsXyl/5dU4PtRvMIikwCh6MmIHgRb+EICpS/c2sfgBjLMKVLdI2EaMO38JETGTIYkHvZhhhPPjXxg6EzS98HsXhrdjJb5nsrn763p5lOx+I6VM0J7CBfB6BBp05JiVhSYZKkTKI07sxueR5EPFkeBOPhEYt7m5V4QpaJfSwOQ7+tQjM2cJLdOjFrar/XGlwf/FdVf8/crv9azevjsA+dStNfQ+NVQmebLNs5W3RqZ0dn6gb9jsn9YkgRXZjmgMDvwjwqqg2rtzFXHusntyfAx379Aknb6j3zse+na6IogKDLsYTGqPxhRO43PdImld/E1kg64m3q25V0FdYmCidcNALEnv9CimhY+Sn7V5jE9YCk/pACxA7LGXDWxctN6TvbKgZ39a/zZgSyOYIJteTYwG5TVOvoUbqQGHuYncxHP8qnwODUySutcftI48d0NGjTymSKKdiokIaKicDLb08qzj0ZackmNAofCqYU+Rztzp2Y4XBiHgchegrFya6Xb+Xm+2y/T4YOIYxw/FAL15ZEZS+TMW6VdoT6qSZfneDFwuuZIY9rmUEvXkMS3CHxQeCNKg07MER4CQrx31B1Dx51J8mFQ4dAEJlG7HYmSD3911ZljzECPZCI9K5p7l5dTF6AAzjG0dMiR7OGLHgvMeMs36++7tig//gfCY8WPFaFqVbXtNUGspzObKsvaLkeifLuj2SebbgwLZJC6kphVJaHWlxOnBtyq/HK+Pk5bvliWGy2L0yf1Uq/Rc65l7pVunSM6Tlvx4Bizzq0swCOG4hu7yzz/fk7MU++M+od0xsI+drn8DEKYyyQrVMAWYhRbMYlOZeSO79P+JSXqnPpIfIrS/e4kFA4QgNZro9k1fr2RediqS89mCqcnKFN611wtU0CVXyHF1/PKEsUHIaPhryaW6ipar6gPncELHsz54N/oC6wP1sEQUU6G/w7+ZJyYn3Ku3AMHbc4qd5925LYHIGfgWW0ZThdGoLIW8J1ZkRsMOn9//Qjrew7YFfalhPLtMWLFXoBHHHYaaLd1CJQvtAegTHoYim1ASZVM0Dl9+T+C2yIWGQ+ZawUX7Kwjglxoaf2pK8sHCTwmwLjA+KF+/eSq6CJal23EVsOrTtEKu4TLBjO8eN8C2Sp/Wx17myC+7s9VHSftd52w9coECiekBbxaEis5eYRHw9Q5b7D/QI+tUhx76D9AJQGpCmqkLBZQSrf8ieEjA8ZmKz1HtyNDnZ3Pxx0URklRJZY1Ac+LtsgmwZY0UEbIdBRmGr1jluRaPEeYJdVwkhO5a2iVaS/i970Pqid2xpw/ca3L8MMdMXMd7HVp/PfCFnTaok5QUOHvvMu3aYQHiVby1agruz95yYIDzn+X2Kpnpm1mn574b9X7ZB4QjAjID6F4SvVc3iOpIgUaBfOtO5t3USZGep0CfYybxHDa0r4rCybebC74gEMgCvwaEwo5X40U23lsM3rgThmoT3AT5b2kANfx+klxKKXJDIRagNdr+BGctx6+Waq96+mNSbqKWSrxPaZ7153Ad2ACvTsGrq/WrsVkTe7rc7wHC6+aBGYWxpNhh6JYb+94NPwFs3dZCQq1GzwPnodPutNVQm9m5wk1KiFigx/OqDLjrTlqJtLyjFjyhhukHm2MdbEEvMk35IBuwYcwW0LdLtGS+7wzpKvIbDTRZE/oAGhlH0TXmvA5kuza4L2ob+sxy87hgNAxVymfcq7Cei918aehvar3zvwGjwpx8eBazZhG44On0Tl554PDnt8zU1IIQRb6w96uH7L2m/BX37sPVPPK8cRunK+qHeBg6WSdsQa1YkJ+YKnA7OFpzRiB3izrtrJqgIb5z1yriF3+QSlufepjQb7ouf+NkQ5qBb3klnIUBhbGFkQoF9yVGZmnXHFoFrmq/+p00egLtuN4pOk2gDWm1jOUcVhKFsPJc3gLkMUtBWc0Qpf9M78U4E+GPRoiuPS31GURWr7Y/Tr4/HxEVRm5kjdWAoh/eoXCAUkgx7EIOvaQ5XUG4/lMt7INW4BiVuT3WxfBMxow8Lr9zLSJi5eML5/EKvJp0RMa+DcBu38J2HjyBgxgQYeFx+Z+qpo0jLo3i7P9US2gfBhuzLgtEegJyNNzLfKBW0udRsP5IUgb97Vdi6ngX6LdiHYcXUH7U+h3rBiNdy4M4N2zUJ9jex4P0cd64YHgBjOzcWbIypcBXMYsx0bWaRuU2zRCFYYC5FHpW4+P9SZ+nk8k5tCtWwZvizvhxM1DulYZx0DcOKU+pIhFoIE20YspOQXfvyNd5L9iAwm++JflXcRXVf/DNChhwgDJiravNMxTr6zDVO4WZ5riaqSEvnzOaAC8oFTTrXyKrkA7UecWeQRriRm9w99WyOlPXdQDSjU1kPt6QxrYl0NhuQqtns0fobArtZuY1bi/kN+T/sSbbtTBqEmURtwWOVfGidxa1ygCYNPXhpS7ltoGqKwmihBpCiiTzddm/iuMY+4I3eG+HL+wqVoh7+YAvbmGUJvujHi1daBT9wcVXUbt2Jtx9RbUb6Uo+mz6MS++sBSNkEdqn1ihVsEbjkbXWauqoGPYAzIFw24j/LBuv02cvSaIW292faZ3Y0duGhgn3Dg2jhOwf5v5sjp1zh9WOsqesc+BnKUTNOXcmqpvs+H/q20BT2XDDjYscxVRyxlFEbBZ/pfn2082mUhyBDuiS0Ja3zXOXqbo4Fttzm7inaXgJ652GWE7pEXqyvAJv1VzmxI1ZrmRPHoeCnXLWVd+LKv4JDBEzRQZDbS7mYq914uYU9SaNnACjV5STg8lMu2QavexaRf5CQfvu/umeOGHc4Zzui/G8AoXmECaUQUjHyWHlzA9QhVybDZq8ehOjey7A4QgTZVht21Pt2zf61fUidb9TOse+m62RkadYBJBZrbOP+evP7fAfpImYEp0ZpZrwyt1tS64bR7+haZXPcWAFHn17LOK0KtwhL6rnoYCHcvSIWKEqxiKbXqe9PXWz5ZHCQaNUCU6oIMP+LpottNsHZSkXOvrNiB5ZMLrBBtYLNm3c2rZn4wYM15199+a9DSo0rh4SwzI7IX/P4Xh3NOksKZL9IT2MelyAL3rjDjoj2Ht2HRgAEnNPG9jubWQID85dIDLNUl5g7wvEVi8YXfk1ibqA2IZ7LD117bsHVVCRJFfE+gaeEPa14Y9yqBsdTfaPwcMHu+Wm5843q/fj/i59Mo8asmxDDMMlv10yguqVRhyXfCV0QAKZuqXOaBFivMaa469Ou9pCxdTcubEHqQs2Lz8ZTSKQ4B8BBVpML4Wr5+gPKsV1wVUe6ZnPqLKXkScHHfX2rgYG9JO+aRfDHln3MIiCOiAF6AbT7AS3L4xexS/9m/1UTpjnBTFc8/V4lRl+0x0KP1QQUgmi1QB7aTDRxdzmBczG0nGSzoXXOi3Ys5weTRJPhPL3WWSUC6ZBQVgNA08lLu6A8vfEZNoCu1XknyM530IXgeIEVPaMrRGJvqOinLMk2RsSPpL/TNP37CqSzsJhTGdpvcO7P00jVHgGQKMArI/p+Ux/aTydSfXf3V1r2B+zwUkqxzyA4NZcxiuO8DRcAczutMRZIOwxgRqEV5FGyoAjnzdJ1Ih7P80TGxWphVk3RynfcGfw4rpRoaizALzOk/LLyT7XKB6bd8eYrSdPUsfxcfoe8FWbyIsdK/YX714bzIxor1R4X12Ntf6L3nlIzEgQi7KJ92aqyxTFW325udrfHwSWiC31Z7mbIbP500+7c5DMsxEB4hJ4muYR+O9ESHA7HgyfBrgOev9TPrxUJLISXgDBNc/6PG6/gGAd1LaD72EVTSCVqy8VG7wcaHzWl5n1HrsRi4RYHnq1ACleXSsrsXT1RV0lAqXsuvStxBqhq50eYi5qi519BfUCl6L/2RIsNvCtAZXEZxs1q7JwdmX+5302/EFAoYW33SEJ5BS4aMs1vjBlZ39GtC14It5969zF1MbTIXTm9zYDpECMDJ+AGwrLDdm+76hQncCvm1U+ZP7uTTy8NnKiKAoJK6ATKJ/Bj+H7LndMFPhzQT0D2u2tuq3WuY5SWGLCOzuOJiI4qGpI6FUFtA2ONv09cqTP828Q6rlZsOOxAgQjJDZtd7ixBCH1FRrJyWwv12WJTxGxOdUnuhXuokShXfe4PCCMwGBNyhT9T1qgQbzKX2b+t/TbyVV82E7iBYoOa3Hlll6bdhdPrK2yZ+67NoV0coaUIG4ax0C3APQ7q76eVqBOFA28CP90xJU+QKnxpG9Ab4z9MDG6du3wdezT3IZvs6r3bFIA+Mqu0Xr/AKW06OphFRbJnCymxFxxm6ewmZmwzF6kicshiHz6E+gaDJS1BW6v9tGxMhYGVrT6IKBHJ1b21UhlM6rrY8eKrrlbjY6dA2fyBFHQQVeLpSTeFE13RkY/fq539mVeX+o/dLCZemjoUu4hRwDGuZtb3JHbpSuT5iD69oUKcXMLUBgDbeuL2btMc54LSBa0xBJ2AB9ABdqFKp4B6nI9PbfWb7IZMy+96+vvDxK+i9RXQa9QTGFxnbDQ1I+xwy52bqMvryNsMXq6rJHFEEnNswdukNxZ1B2jHyUw2wP70wUUYr7b1dHrUxU6sk56Dyl3ZjKHQ+iH6set/ZvITDxFY5FpAtJVJWmlxZ4+kiXUBp1RJfEdFjs0Pb3NpAKeoYjRjBGQsWDFDSoj/k4RvtuceLkWBKMuF6DpL+gOhWKqUmsc+pMcil55ZIBNJe9EkwzkzgM2jFQVYLPRNMFnl3zOy7DoPOx/PW66J+rGzSRk1cQ4QhDtrFXjbko9ZssOwC7O9qjFeRmmdWMnEklNaTiAEzh5I9XeFkRgu0cJdeL89IW3bE4bP9SGJjVFj8Koqf8Ne/g3uw4SxXUqrEjM9vUkd37m2Znr5bRxXh/Z5b2WAFs2VlsMmcAzJr+Oihih5lMbI59ik1iVrrmZVEGhEZYKI4oCRwbuIQOjCcp9ltWz6LPcVHzZzIHf5HlAEM+iVNktryEepPugSqevrypFApSld2WJq9iBJ7Vsu7INDI/Hk5+C/PL9E7u4oydhvbNxI9cQDHJzYK//vz3YUs2SPn/8t2YZM+wlBHv6gBqHtDGLg+K9cMAGb9hXNppWu0uk8cTAJbON4gp3bqH0tPkNzgVDp0HjOYmWE7UgKMO2QX48EAp6WPfJOxh6+UjN7C24dDeFH3VV+JXqVOu4I4yCaTAzZ2QnBZb56D9dKH/H8w92XEkQdcmHo8polOvBsMfVhzFw4kk0gOigJCwWKhcMVeQjWzrYaQv5oJo3fUwHm0kj2uIg4oFCLMsh0v+Z0scoFt5ckXK9o3GLZOKgBmmJOZZ7mlsRTUOB+zpmagYvQu0HSDpqyAfl8veW1Mx9qd4LeMvX2Jvz/mhJq8Sl/Fn/GqMV/wDeEtyFWj0YDJzrsm29pOJcjksLPLLWNxOOsOef3Jyb9lQapmydaLnBgz26aJeWzNTf0/IsYV56Sf+5lrLRqIIo14XFKoQFcjaupcF91gZ9FKVTH2pdZmf/yIn6Dk3AwJw9fHKZFgC6BIy2HklOG4GlZDBTM1eUAqAkrqqzdCzz58ZkDeRKNqz25Dik1I0bg01JIRpmmKRPi22o7t1Aw6jqHTwIJZEDSenAl/4egS7ZbdSrf0WN296wgvReNMWxLzeQbMsf6ivAEA6rmBVsbQsZDvpeRTxRW9TdN1Ck7eRJv4WD1TNYF8kmMX0/WC1knOSH74WxDk7sU6KzNagsS7zIAclk2YGDLuGKZ0fbri1hUQ/LUREZ2ZR97GNlZnheNXEGGTVr6apPszaCIZLjjd7BsbywpMEdyKh+xBTi2PGbCDgpLRqDyT3GgqpUvQ0fDmXW0IMNWGTLKZCOx2Gnfur3q3b09OU+PgivWUnNnZ9fjHH+wE7V8Hgur53UvoYQhyeGs2v+y3Og56UsSkzfR1LfuP+clc/4wc6nzHoyD6jd6bkEZu1KkMrT2qauClJsyWX3tvBUO5sKAe4vyEkXJ2Qog1hb4EQxwSSTSLFKP2JE+sjKl5rbtJgB/N0cqCvubI0zioIy5oss1Z4BUGn7EpGyiPpzTcxROA2LcC5w43HqlFdbolF0ffPP407N8Ch3SsVygF7meELRUoKWkmqXHPLBt2t4N1roZtoBLvEEOWzAwaSivOvgvTqDYAed3LE0ka7AmJ7fmyMzeZKEYdSo3tYwgsOSJCAAAA="
        },
        {
            name: "Jeff Bezos",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxd45ygfe2dJjgqMkMl-RaRLgm4RAFxvUHuQ2uG5j092RGcPvvJH-uPWw&s=10"
        }
    ]);
    useEffect(() => {
        async function fetchData() {
            try{
                 const req = await axios.get("/tinder/cards");
            setPeople(req.data);
        }catch(error){
            console.error("Error fetching cards:", error);
        }
    }

        fetchData();
    },[])

    console.log(people);

    const swiped = (direction, nameToDelete) => {
        console.log("Removing: " + nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    return (
        <div className="tinderCards">
            <div className="tinderCards__cardContainer">
                {people.map((person) => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={["up", "down"]}
                        onSwipe={(dir) => swiped(dir, person.name)}
                        onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div
                            className="card"
                            style={{
                                backgroundImage: `url("${person.imgUrl}")`
                            }}
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TinderCards;
